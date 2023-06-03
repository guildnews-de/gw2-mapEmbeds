import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GW2Point } from '../../components/leaflet/gw2';

export interface MarkerState {
  active: string | undefined;
  currentPos?: string | null;
  groups?: Record<string, GW2Point[]>;
}

const initSate: MarkerState = {
  active: undefined,
  currentPos: null,
  groups: undefined,
};

export const markerSlice = createSlice({
  name: 'marker',
  initialState: initSate,
  reducers: {
    pushMarker(state, action: PayloadAction<[string, GW2Point[]]>) {
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
      groups && delete groups[hash];
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
