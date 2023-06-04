import { createSlice } from '@reduxjs/toolkit';

export interface appState {
  mapsLoaded: boolean;
  modal: boolean;
  canvas: {
    open: boolean;
    loadLL: boolean;
  };
}

const initState: appState = {
  mapsLoaded: false,
  modal: false,
  canvas: {
    open: false,
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
    toggleModal(state) {
      const { modal } = state;
      return {
        ...state,
        modal: !modal,
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
  toggleModal,
} = appSlice.actions;
export default appSlice.reducer;
