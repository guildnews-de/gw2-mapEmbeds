import type { PayloadAction } from '@reduxjs/toolkit';
import { GW2PointGroup } from '../../components/leaflet/gw2/GW2Point';
export interface MarkerState {
    active: string | undefined;
    currentPos?: string | null;
    groups?: Record<string, GW2PointGroup>;
}
export declare const markerSlice: import("@reduxjs/toolkit").Slice<MarkerState, {
    pushMarker(state: import("immer/dist/internal").WritableDraft<MarkerState>, action: PayloadAction<[string, GW2PointGroup]>): {
        groups: {
            [x: string]: GW2PointGroup | import("immer/dist/internal").WritableDraft<GW2PointGroup>;
        };
        active: string | undefined;
        currentPos?: string | null | undefined;
    };
    popMarker(state: import("immer/dist/internal").WritableDraft<MarkerState>, action: PayloadAction<string>): {
        groups: import("immer/dist/internal").WritableDraft<Record<string, GW2PointGroup>> | undefined;
        active: string | undefined;
        currentPos?: string | null | undefined;
    };
    setMarker(state: import("immer/dist/internal").WritableDraft<MarkerState>, action: PayloadAction<string>): {
        active: string;
        currentPos?: string | null | undefined;
        groups?: import("immer/dist/internal").WritableDraft<Record<string, GW2PointGroup>> | undefined;
    };
    setCurrent(state: import("immer/dist/internal").WritableDraft<MarkerState>, action: PayloadAction<string>): {
        currentPos: string;
        active: string | undefined;
        groups?: import("immer/dist/internal").WritableDraft<Record<string, GW2PointGroup>> | undefined;
    };
    wipeCurrent(state: import("immer/dist/internal").WritableDraft<MarkerState>): {
        currentPos: null;
        active: string | undefined;
        groups?: import("immer/dist/internal").WritableDraft<Record<string, GW2PointGroup>> | undefined;
    };
}, "marker">;
export declare const pushMarker: import("@reduxjs/toolkit").ActionCreatorWithPayload<[string, GW2PointGroup], "marker/pushMarker">, popMarker: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "marker/popMarker">, setMarker: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "marker/setMarker">, setCurrent: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "marker/setCurrent">, wipeCurrent: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"marker/wipeCurrent">;
declare const _default: import("redux").Reducer<MarkerState>;
export default _default;
