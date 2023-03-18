import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface mapState {
  bounds: [number, number];
  activeMap: number;
}

const initState: mapState = {
  bounds: [81920, 114688],
  activeMap: 0,
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
    setActiveMap(state, action: PayloadAction<number>) {
      return {
        ...state,
        activeMap: action.payload,
      };
    },
  },
});

export const { setBounds, setActiveMap } = mapSlice.actions;
export default mapSlice.reducer;
