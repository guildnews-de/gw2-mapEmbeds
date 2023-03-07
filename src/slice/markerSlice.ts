import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MarkerObject {
  title: string;
  pos: [number,number];
}

export interface MarkerState {
  active: string;
  groups?: Record<string, MarkerObject[]>;
}

const initSate: MarkerState = {
  active: 'none',
  groups: undefined,
};

export const markerSlice = createSlice({
  name: 'marker',
  initialState: initSate,
  reducers: {
    pushMarker(state, action: PayloadAction<[string, MarkerObject[]]>) {
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
