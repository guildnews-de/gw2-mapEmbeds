import { createSlice } from '@reduxjs/toolkit';

export interface appState {
  canvas: {
    open: boolean;
  };
}

const initState: appState = {
  canvas: {
    open: true,
  },
};

export const appSlice = createSlice({
  name: 'map',
  initialState: initState,
  reducers: {
    toggleCanvas(state) {
      const { open } = state.canvas;
      return {
        ...state,
        canvas: {
          ...state.canvas,
          open: !open,
        },
      };
    },
    openCanvas(state) {
      return {
        ...state,
        canvas: {
          ...state.canvas,
          open: true,
        },
      };
    },
    closeCanvas(state) {
      return {
        ...state,
        canvas: {
          ...state.canvas,
          open: false,
        },
      };
    },
  },
});

export const { toggleCanvas, openCanvas, closeCanvas } = appSlice.actions;
export default appSlice.reducer;
