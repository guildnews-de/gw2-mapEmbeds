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
export declare const mapSlice: import("@reduxjs/toolkit").Slice<mapState, {
    setBounds(state: import("immer/dist/internal").WritableDraft<mapState>, action: PayloadAction<[number, number]>): {
        bounds: [number, number];
        center: [number, number];
        activeMaps: number[];
        tileDate: number;
    };
    setCenter(state: import("immer/dist/internal").WritableDraft<mapState>, action: PayloadAction<PointTuple>): {
        center: PointTuple;
        bounds: [number, number];
        activeMaps: number[];
        tileDate: number;
    };
    setTileDate(state: import("immer/dist/internal").WritableDraft<mapState>, action: PayloadAction<tileApiData>): {
        tileDate: number;
        bounds: [number, number];
        center: [number, number];
        activeMaps: number[];
    };
    addActiveMap(state: import("immer/dist/internal").WritableDraft<mapState>, action: PayloadAction<number>): import("immer/dist/internal").WritableDraft<mapState>;
}, "map">;
export declare const setBounds: import("@reduxjs/toolkit").ActionCreatorWithPayload<[number, number], "map/setBounds">, setCenter: import("@reduxjs/toolkit").ActionCreatorWithPayload<PointTuple, "map/setCenter">, setTileDate: import("@reduxjs/toolkit").ActionCreatorWithPayload<tileApiData, "map/setTileDate">, addActiveMap: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "map/addActiveMap">;
declare const _default: import("redux").Reducer<mapState>;
export default _default;
