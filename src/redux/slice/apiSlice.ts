import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AxiosRequestConfig } from 'axios';
import { GW2ApiMapsResponse, GW2ApiError } from '../apiMiddleware';

export interface GW2ApiRequest {
  loading: boolean;
  error?: GW2ApiError | null;
  request?: AxiosRequestConfig;
  response: Record<number, GW2ApiMapsResponse>;
}

export interface GW2ApiRequestParams {
  id?: number;
  lang?: 'de' | 'en' | 'es' | 'fr';
  access_token?: string;
}

export const initState: GW2ApiRequest = {
  loading: false,
  error: null,
  request: {
    method: 'GET',
  },
  response: {
    0: {
      id: 0,
      name: 'Dummy Data',
      min_level: 0,
      max_level: 0,
      default_floor: 1,
      type: 'Public',
      floors: [],
      region_id: 0,
      region_name: 'Tyria',
      continent_id: 1,
      continent_name: 'Tyria',
      map_rect: [
        [0, 0],
        [81920, 114688],
      ],
      continent_rect: [
        [0, 0],
        [81920, 114688],
      ],
    },
  },
};

export const apiSlice = createSlice({
  name: 'api',
  initialState: initState,
  reducers: {
    setLoading(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    setError(state, action: PayloadAction<GW2ApiError>) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchMap(state, action: PayloadAction<GW2ApiRequestParams>) {
      const { id, lang = 'en' } = action.payload;
      return {
        ...state,
        request: {
          ...state.request,
          url: `/maps/${id}`,
          params: {
            lang: lang,
          },
        },
      };
    },
    setData(
      state,
      action: PayloadAction<{ mapID: number; mapData: GW2ApiMapsResponse }>,
    ) {
      const { mapID, mapData: newData } = action.payload;
      const prevState = state.response[mapID];
      return {
        ...state,
        error: null,
        response: {
          ...state.response,
          [mapID]: {
            ...prevState,
            ...newData
          }
          ,
        },
      };
    },
    setDone(state) {
      return {
        ...state,
        loading: false,
      };
    },
  },
});

export const { setLoading, setError, fetchMap, setData, setDone } =
  apiSlice.actions;
export default apiSlice.reducer;
