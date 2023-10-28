import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GW2PointGroup } from '../../components/leaflet/gw2/GW2Point';

export interface MarkerState {
  active: string | undefined;
  currentPos?: string | undefined;
  groups?: Record<string, GW2PointGroup>;
}

const initSate: MarkerState = {
  active: undefined,
  currentPos: undefined,
  groups: undefined,
};

export const markerSlice = createSlice({
  name: 'marker',
  initialState: initSate,
  reducers: {
    pushMarker(state, action: PayloadAction<[string, GW2PointGroup]>) {
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
        currentPos: undefined,
      };
    },
  },
});

export const { pushMarker, popMarker, setMarker, setCurrent, wipeCurrent } =
  markerSlice.actions;
export default markerSlice.reducer;
