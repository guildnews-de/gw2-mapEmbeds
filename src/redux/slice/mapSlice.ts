import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface mapState {
  bounds: [number, number];
  activeMaps: number[];
}

const initState: mapState = {
  bounds: [81920, 114688],
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
    addActiveMap(state, action: PayloadAction<number>) {
      const { activeMaps } = state;
      if (activeMaps.includes(action.payload)) {
        console.debug("Schon drin: "+action.payload);
        return state;
      }
      if (activeMaps.length === 1 && activeMaps[0] === 0) {
        console.debug("0 ersetzt mit: "+action.payload);
        return {
          ...state,
          activeMaps: [action.payload],
        };
      }
      console.debug("Neu dazu: "+action.payload);
      return {
        ...state,
        activeMaps: [
          ...state.activeMaps,
          action.payload
        ],
      };
    },
  },
});

export const { setBounds, addActiveMap } = mapSlice.actions;
export default mapSlice.reducer;
