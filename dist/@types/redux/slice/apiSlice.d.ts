import type { PayloadAction } from '@reduxjs/toolkit';
import { GW2ApiMapsResponse, GW2ApiError, GW2ApiRegionsResponse, GW2ApiPoi } from '../apiMiddleware';
export interface GW2ApiRequest {
    loading: boolean | undefined;
    error?: GW2ApiError | null;
    request: {
        method?: string;
    };
    response: Record<number, GW2MapsApiData>;
}
export interface GW2MapsApiData extends Omit<GW2ApiMapsResponse & GW2ApiRegionsResponse, 'points_of_interest'> {
    poi?: Record<number, GW2ApiPoi>;
}
export interface GW2ApiRequestParams {
    id: number;
    lang?: 'de' | 'en' | 'es' | 'fr';
    access_token?: string;
}
export declare const initState: GW2ApiRequest;
export declare const apiSlice: import("@reduxjs/toolkit").Slice<GW2ApiRequest, {
    setLoading(state: import("immer/dist/internal").WritableDraft<GW2ApiRequest>): {
        loading: true;
        error: null;
        request: import("immer/dist/internal").WritableDraft<{
            method?: string | undefined;
        }>;
        response: import("immer/dist/internal").WritableDraft<Record<number, GW2MapsApiData>>;
    };
    setError(state: import("immer/dist/internal").WritableDraft<GW2ApiRequest>, action: PayloadAction<GW2ApiError>): {
        loading: false;
        error: GW2ApiError;
        request: import("immer/dist/internal").WritableDraft<{
            method?: string | undefined;
        }>;
        response: import("immer/dist/internal").WritableDraft<Record<number, GW2MapsApiData>>;
    };
    fetchMap(state: import("immer/dist/internal").WritableDraft<GW2ApiRequest>, action: PayloadAction<GW2ApiRequestParams>): {
        request: {
            url: string;
            params: {
                lang: "de" | "en" | "es" | "fr";
            };
            method?: string | undefined;
        };
        loading: boolean | undefined;
        error?: import("immer/dist/internal").WritableDraft<GW2ApiError> | null | undefined;
        response: import("immer/dist/internal").WritableDraft<Record<number, GW2MapsApiData>>;
    };
    setData(state: import("immer/dist/internal").WritableDraft<GW2ApiRequest>, action: PayloadAction<{
        mapID: number;
        mapData: GW2ApiMapsResponse | GW2ApiRegionsResponse;
    }>): {
        error: null;
        response: {
            [x: number]: import("immer/dist/internal").WritableDraft<GW2MapsApiData> | {
                id?: number | undefined;
                name?: string | undefined;
                min_level?: number | undefined;
                max_level?: number | undefined;
                default_floor?: number | undefined;
                type?: string | undefined;
                floors?: number[] | undefined;
                region_id?: number | undefined;
                region_name?: string | undefined;
                continent_id?: number | undefined;
                continent_name?: string | undefined;
                map_rect?: [[number, number], [number, number]] | undefined;
                continent_rect?: [[number, number], [number, number]] | undefined;
                poi?: import("immer/dist/internal").WritableDraft<Record<number, GW2ApiPoi>> | undefined;
                label_coord?: [number, number] | undefined;
                sectors?: import("immer/dist/internal").WritableDraft<Record<number, import("../apiMiddleware").GW2ApiSector>> | undefined;
            } | {
                name?: string | undefined;
                min_level?: number | undefined;
                max_level?: number | undefined;
                default_floor?: number | undefined;
                label_coord?: [number, number] | undefined;
                map_rect?: [[number, number], [number, number]] | undefined;
                continent_rect?: [[number, number], [number, number]] | undefined;
                points_of_interest?: Record<number, GW2ApiPoi> | undefined;
                sectors?: Record<number, import("../apiMiddleware").GW2ApiSector> | undefined;
                id?: number | undefined;
                poi?: import("immer/dist/internal").WritableDraft<Record<number, GW2ApiPoi>> | undefined;
                type?: string | undefined;
                floors?: number[] | undefined;
                region_id?: number | undefined;
                region_name?: string | undefined;
                continent_id?: number | undefined;
                continent_name?: string | undefined;
            };
        };
        loading: boolean | undefined;
        request: import("immer/dist/internal").WritableDraft<{
            method?: string | undefined;
        }>;
    };
    setDone(state: import("immer/dist/internal").WritableDraft<GW2ApiRequest>): {
        loading: false;
        error?: import("immer/dist/internal").WritableDraft<GW2ApiError> | null | undefined;
        request: import("immer/dist/internal").WritableDraft<{
            method?: string | undefined;
        }>;
        response: import("immer/dist/internal").WritableDraft<Record<number, GW2MapsApiData>>;
    };
}, "api">;
export declare const setLoading: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"api/setLoading">, setError: import("@reduxjs/toolkit").ActionCreatorWithPayload<GW2ApiError, "api/setError">, fetchMap: import("@reduxjs/toolkit").ActionCreatorWithPayload<GW2ApiRequestParams, "api/fetchMap">, setData: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    mapID: number;
    mapData: GW2ApiMapsResponse | GW2ApiRegionsResponse;
}, "api/setData">, setDone: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"api/setDone">;
declare const _default: import("redux").Reducer<GW2ApiRequest>;
export default _default;
