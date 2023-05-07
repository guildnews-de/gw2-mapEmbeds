import axios from 'axios';

import {
  setLoading,
  setError,
  setData,
  setDone,
  fetchMap,
} from './slice/apiSlice';
import { Middleware, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface GW2ApiPoi {
  name: string;
  coord: [number, number];
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

export type GW2ApiError = { text: string };

const apiMiddleware: Middleware<{}, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    const isApiAction = isAnyOf(fetchMap);
    if (!isApiAction(action)) return;

    // axios default configs
    axios.defaults.baseURL = 'https://api.guildwars2.com/v2';
    axios.defaults.timeout = 5000;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    // fetch basic map data
    dispatch(setLoading());
    const { id, lang } = action.payload;
    const region = {
      id: 0,
    };
    axios({
      url: `/maps/${id}`,
      params: {
        lang: lang,
      },
    })
      .then(({ data }: { data: GW2ApiMapsResponse }) => {
        region.id = data.region_id!;
        dispatch(setData({ mapID: id!, mapData: data }));
      })
      .then(() => {
        axios({
          url: `/continents/1/floors/1/regions/${region.id}/maps/${id}`,
          params: {
            lang: lang,
          },
        }).then(({ data }: { data: GW2ApiRegionsResponse }) => {
          // @ts-ignore
          const { label_coord, points_of_interest: poi, sectors } = data;
          const cropData = {
            label_coord: label_coord,
            poi: poi,
            sectors: sectors,
          };
          dispatch(setData({ mapID: id!, mapData: cropData }));
        });
      })
      .catch((error: GW2ApiError) => {
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setDone());
      });
  };

export default apiMiddleware;
