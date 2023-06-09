import { createSlice } from '@reduxjs/toolkit';

export interface appState {
  mapsLoaded: boolean;
  modal: boolean;
  canvas: {
    open: boolean;
    wide: boolean;
    loadLL: boolean;
  };
}

const initState: appState = {
  mapsLoaded: false,
  modal: false,
  canvas: {
    open: false,
    wide: false,
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
    toggleWide(state) {
      const { wide } = state.canvas;
      return {
        ...state,
       canvas: {
        ...state.canvas,
        wide: !wide,
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
  toggleWide,
  setMapsLoaded,
  activateLL,
  toggleModal,
} = appSlice.actions;
export default appSlice.reducer;
