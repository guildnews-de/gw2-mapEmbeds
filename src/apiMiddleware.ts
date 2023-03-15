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

export interface GW2ApiMapsResponse {
  id: number;
  name: string;
  min_level: number;
  max_level: number;
  default_floor: number;
  type: string;
  floors: number[];
  region_id: number;
  region_name: string;
  continent_id: number;
  continent_name: string;
  map_rect: [[number, number], [number, number]];
  continent_rect: [[number, number], [number, number]];
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
    
    dispatch(setLoading());
    
    const { ids, lang } = action.payload;
    axios
      .request({
        url: '/maps',
        params: {
          ids: ids!.toString(),
          lang: lang,
        },
      })
      .then(({ data }: { data: GW2ApiMapsResponse[] }) => {
        data.forEach((map, index) => {
          dispatch(setData({ mapID: ids![index], mapData: map }));
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
