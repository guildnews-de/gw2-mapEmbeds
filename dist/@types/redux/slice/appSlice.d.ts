export interface appState {
    mapsLoaded: boolean;
    modal: boolean;
    canvas: {
        open: boolean;
        loadLL: boolean;
    };
}
export declare const appSlice: import("@reduxjs/toolkit").Slice<appState, {
    toggleCanvas(state: import("immer/dist/internal").WritableDraft<appState>): {
        canvas: {
            open: boolean;
            loadLL: boolean;
        };
        mapsLoaded: boolean;
        modal: boolean;
    };
    openCanvas(state: import("immer/dist/internal").WritableDraft<appState>): {
        canvas: {
            open: true;
            loadLL: boolean;
        };
        mapsLoaded: boolean;
        modal: boolean;
    };
    closeCanvas(state: import("immer/dist/internal").WritableDraft<appState>): {
        canvas: {
            open: false;
            loadLL: boolean;
        };
        mapsLoaded: boolean;
        modal: boolean;
    };
    setMapsLoaded(state: import("immer/dist/internal").WritableDraft<appState>): {
        mapsLoaded: true;
        modal: boolean;
        canvas: import("immer/dist/internal").WritableDraft<{
            open: boolean;
            loadLL: boolean;
        }>;
    };
    activateLL(state: import("immer/dist/internal").WritableDraft<appState>): {
        canvas: {
            loadLL: true;
            open: boolean;
        };
        mapsLoaded: boolean;
        modal: boolean;
    };
    toggleModal(state: import("immer/dist/internal").WritableDraft<appState>): {
        modal: boolean;
        mapsLoaded: boolean;
        canvas: import("immer/dist/internal").WritableDraft<{
            open: boolean;
            loadLL: boolean;
        }>;
    };
}, "map">;
export declare const toggleCanvas: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/toggleCanvas">, openCanvas: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/openCanvas">, closeCanvas: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/closeCanvas">, setMapsLoaded: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/setMapsLoaded">, activateLL: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/activateLL">, toggleModal: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/toggleModal">;
declare const _default: import("redux").Reducer<appState>;
export default _default;
