import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PointTuple } from 'leaflet';

export interface mapState {
  bounds: [number, number];
  center: PointTuple;
  activeMaps: number[];
}

const initState: mapState = {
  bounds: [81920, 114688],
  center: [40960, 57344],
  activeMaps: [0],
};

export const mapSlice = createSlice({
  name: 'map',
  initialState: initState,
  reducers: {
    setBounds(state, action: PayloadAction<[number, number]>) {
      return {
        ...state,
        bounds: action.payload,
      };
    },
    setCenter(state, action: PayloadAction<PointTuple>) {
      console.debug('WuppWupp: ' + action.payload);
      return {
        ...state,
        center: action.payload,
      };
    },
    addActiveMap(state, action: PayloadAction<number>) {
      const { activeMaps } = state;
      if (activeMaps.includes(action.payload)) {
        return state;
      }
      if (activeMaps.length === 1 && activeMaps[0] === 0) {
        return {
          ...state,
          activeMaps: [action.payload],
        };
      }
      return {
        ...state,
        activeMaps: [...state.activeMaps, action.payload],
      };
    },
  },
});

export const { setBounds, setCenter, addActiveMap } = mapSlice.actions;
export default mapSlice.reducer;
