import { Middleware, isAnyOf } from '@reduxjs/toolkit';
import { differenceInDays } from 'date-fns';
import { openDB } from 'idb';
import axios from 'axios';

import {
  setLoading,
  setError,
  setData,
  setDone,
  fetchMap,
} from './slice/apiSlice';
import type { RootState } from './store';

import {
  GW2ApiMapsResponse,
  type GW2ApiRegionsResponse,
  type GW2ApiError,
} from '../common/interfaces';

interface CachedGW2Data extends GW2ApiMapsResponse, GW2ApiRegionsResponse {
  timestamp: number;
}

const apiMiddleware: Middleware<Record<string, never>, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    const isApiAction = isAnyOf(fetchMap);
    if (!isApiAction(action)) return;

    dispatch(setLoading());
    const { id, lang } = action.payload;
    const cacheKey = `maps_${id}_${lang}`;
    const dateNow = new Date();

    const dbPromise = openDB('GW2_MapTool', 2, {
      upgrade(db) {
        db.createObjectStore('gw2_api_data');
      },
    });

    // Check if the data is already cached in IndexedDB
    dbPromise
      .then((db) => {
        return db
          .get('gw2_api_data', cacheKey)
          .then((cachedData: CachedGW2Data | undefined) => {
            const cacheAge = cachedData
              ? differenceInDays(dateNow, cachedData.timestamp)
              : 4;
            if (cachedData && cacheAge < 3) {
              // If data is found in IndexedDB, dispatch it
              //console.debug('From Database');
              dispatch(setData({ mapID: id, mapData: cachedData }));
              dispatch(setDone());
            } else {
              //console.debug('From API');
              // axios default configs
              axios.defaults.baseURL = 'https://api.guildwars2.com/v2';
              axios.defaults.timeout = 5000;
              axios.defaults.headers.common['Content-Type'] =
                'application/json';

              const special = [922];

              const apiData = {
                regId: 0,
                map: {} as GW2ApiMapsResponse,
              };
              axios({
                url: `/maps/${id}`,
                params: {
                  lang: lang,
                },
              })
                .then(({ data }: { data: GW2ApiMapsResponse }) => {
                  apiData.regId = data.region_id!;
                  apiData.map = data;

                  if (special.includes(id)) {
                    axios.defaults.baseURL =
                      'https://assets.guildnews.de/json/v2';
                  }
                  // dispatch(setData({ mapID: id!, mapData: data }));
                })
                .then(() => {
                  axios({
                    url: `/continents/1/floors/1/regions/${apiData.regId}/maps/${id}`,
                    params: {
                      lang: lang,
                    },
                  })
                    .then(({ data }: { data: GW2ApiRegionsResponse }) => {
                      const {
                        label_coord,
                        points_of_interest: poi,
                        sectors,
                      } = data;
                      const cropData = {
                        label_coord: label_coord,
                        poi: poi,
                        sectors: sectors,
                      };
                      apiData.map = {
                        ...apiData.map,
                        ...cropData,
                      };
                      //console.log(JSON.stringify(cropData));
                      //console.log(JSON.stringify(data));
                      dispatch(setData({ mapID: id, mapData: apiData.map }));
                      // Store the data in IndexedDB for future use
                      db.put(
                        'gw2_api_data',
                        {
                          timestamp: dateNow,
                          ...apiData.map,
                        },
                        cacheKey,
                      ).catch((err) => {
                        console.error(err);
                      });
                    })
                    .catch((error: GW2ApiError) => {
                      dispatch(setError(error));
                    });
                })
                .catch((error: GW2ApiError) => {
                  dispatch(setError(error));
                })
                .finally(() => {
                  dispatch(setDone());
                });
            }
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

export default apiMiddleware;
