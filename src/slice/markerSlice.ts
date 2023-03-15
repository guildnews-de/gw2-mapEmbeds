import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GW2ApiPoi } from '../apiMiddleware';

export interface MarkerState {
  active: string;
  groups?: Record<string, GW2ApiPoi[]>;
}

const initSate: MarkerState = {
  active: 'none',
  groups: undefined,
};

export const markerSlice = createSlice({
  name: 'marker',
  initialState: initSate,
  reducers: {
    pushMarker(state, action: PayloadAction<[string, GW2ApiPoi[]]>) {
      const [hash, object] = action.payload;
      return {
        ...state,
        groups: {
          ...state.groups,
          [hash]: object,
        },
      };
    },
    popMarker(state, action: PayloadAction<string>) {
      const { payload: hash } = action;
      const { groups } = state;
      delete groups![hash];
      return {
        ...state,
        groups,
      };
    },
    setMarker(state, action: PayloadAction<string>) {
      const { payload: hash } = action;
      return {
        ...state,
        active: hash,
      };
    },
  },
});

export const { pushMarker, popMarker, setMarker } = markerSlice.actions;
export default markerSlice.reducer;
