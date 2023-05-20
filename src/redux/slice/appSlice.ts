import { createSlice } from '@reduxjs/toolkit';

export interface appState {
  mapsLoaded: boolean;
  canvas: {
    open: boolean;
    loadLL: boolean;
  };
}

const initState: appState = {
  mapsLoaded: false,
  canvas: {
    open: true,
    loadLL: false,
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
    setMapsLoaded(state) {
      return {
        ...state,
        mapsLoaded: true,
      };
    },
    activateLL(state) {
      return {
        ...state,
        canvas: {
          ...state.canvas,
          loadLL: true,
        },
      };
    },
  },
});

export const {
  toggleCanvas,
  openCanvas,
  closeCanvas,
  setMapsLoaded,
  activateLL,
} = appSlice.actions;
export default appSlice.reducer;
