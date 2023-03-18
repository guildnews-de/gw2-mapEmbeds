import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GW2ApiPoi } from '../apiMiddleware';

export interface MarkerState {
  active: string;
  currentPos?: string | null;
  groups?: Record<string, GW2ApiPoi[]>;
}

const initSate: MarkerState = {
  active: 'none',
  currentPos: null,
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
    setCurrent(state, action: PayloadAction<string>) {
      const { payload: current } = action;
      return {
        ...state,
        currentPos: current,
      };
    },
    wipeCurrent(state) {
      return {
        ...state,
        currentPos: null,
      };
    },
  },
});

export const { pushMarker, popMarker, setMarker, setCurrent, wipeCurrent } =
  markerSlice.actions;
export default markerSlice.reducer;
