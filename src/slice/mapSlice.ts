import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface mapState {
  bounds: [number, number];
}

const initState: mapState = {
  bounds: [81920, 114688],
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
  },
});

export const { setBounds } = mapSlice.actions;
export default mapSlice.reducer;
