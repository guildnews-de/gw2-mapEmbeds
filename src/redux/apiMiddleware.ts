import { Middleware, isAnyOf } from '@reduxjs/toolkit';
import { differenceInDays } from 'date-fns';
//import localforage from 'localforage';
import { openDB } from 'idb';
import axios from 'axios';
import {
  setLoading,
  setError,
  setData,
  setDone,
  fetchMap,
} from './slice/apiSlice';
import { RootState } from './store';
import { PointTuple } from 'leaflet';

export interface GW2ApiPoi {
  name: string;
  coord: PointTuple;
  type?: string;
  floor?: 1;
  chat_link?: string;
}

export interface GW2ApiSector {
  name: string;
  coord: [number, number];
  bounds: [number, number][];
  chat_link: string;
}

export interface GW2ApiMapsResponse {
  id?: number;
  name?: string;
  min_level?: number;
  max_level?: number;
  default_floor?: number;
  type?: string;
  floors?: number[];
  region_id?: number;
  region_name?: string;
  continent_id?: number;
  continent_name?: string;
  map_rect?: [[number, number], [number, number]];
  continent_rect?: [[number, number], [number, number]];
}

export interface GW2ApiRegionsResponse {
  name?: string;
  min_level?: number;
  max_level?: number;
  default_floor?: number;
  label_coord?: [number, number];
  map_rect?: [[number, number], [number, number]];
  continent_rect?: [[number, number], [number, number]];
  points_of_interest?: Record<number, GW2ApiPoi>;
  sectors?: Record<number, GW2ApiSector>;
  id?: number;
}

interface CachedGW2Data extends GW2ApiMapsResponse, GW2ApiRegionsResponse {
  timestamp: number;
}

export type GW2ApiError = { text: string };

const apiMiddleware: Middleware<{}, RootState> =
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
    dbPromise.then((db) => {
      return db
        .get('gw2_api_data', cacheKey)
        .then((cachedData: CachedGW2Data | undefined) => {
          const cacheAge = cachedData
            ? differenceInDays(dateNow, cachedData.timestamp)
            : 4;
          if (cachedData && cacheAge < 3) {
            // If data is found in IndexedDB, dispatch it
            //console.debug('From Database');
            dispatch(setData({ mapID: id!, mapData: cachedData }));
            dispatch(setDone());
          } else {
            //console.debug('From API');
            // axios default configs
            axios.defaults.baseURL = 'https://api.guildwars2.com/v2';
            axios.defaults.timeout = 5000;
            axios.defaults.headers.common['Content-Type'] = 'application/json';

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
                // dispatch(setData({ mapID: id!, mapData: data }));
              })
              .then(() => {
                axios({
                  url: `/continents/1/floors/1/regions/${apiData.regId}/maps/${id}`,
                  params: {
                    lang: lang,
                  },
                }).then(({ data }: { data: GW2ApiRegionsResponse }) => {
                  // @ts-ignore
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
                  dispatch(setData({ mapID: id!, mapData: apiData.map }));
                  // Store the data in IndexedDB for future use
                  db.put(
                    'gw2_api_data',
                    {
                      timestamp: dateNow,
                      ...apiData.map,
                    },
                    cacheKey,
                  );
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
    });
  };

export default apiMiddleware;
