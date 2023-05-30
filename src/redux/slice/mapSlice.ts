import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PointTuple } from 'leaflet';

export interface mapState {
  bounds: [number, number];
  center: PointTuple;
  activeMaps: number[];
  tileDate: number;
}

export interface tileApiData {
  api: number;
  date: number;
}

const initState: mapState = {
  bounds: [81920, 114688],
  center: [40960, 57344],
  activeMaps: [0],
  tileDate: 0,
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
      return {
        ...state,
        center: action.payload,
      };
    },
    setTileDate(state, action: PayloadAction<tileApiData>) {
      const { date } = action.payload;
      return {
        ...state,
        tileDate: date,
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

export const { setBounds, setCenter, setTileDate, addActiveMap } = mapSlice.actions;
export default mapSlice.reducer;
