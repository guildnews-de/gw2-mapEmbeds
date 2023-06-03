declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    api: import("./slice/apiSlice").GW2ApiRequest;
    app: import("./slice/appSlice").appState;
    map: import("./slice/mapSlice").mapState;
    marker: import("./slice/markerSlice").MarkerState;
}>, import("redux").AnyAction>;
declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("redux").CombinedState<{
    api: import("./slice/apiSlice").GW2ApiRequest;
    app: import("./slice/appSlice").appState;
    map: import("./slice/mapSlice").mapState;
    marker: import("./slice/markerSlice").MarkerState;
}>, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<import("redux").CombinedState<{
    api: import("./slice/apiSlice").GW2ApiRequest;
    app: import("./slice/appSlice").appState;
    map: import("./slice/mapSlice").mapState;
    marker: import("./slice/markerSlice").MarkerState;
}>, import("redux").AnyAction>, import("redux").Middleware<Record<string, never>, import("redux").CombinedState<{
    api: import("./slice/apiSlice").GW2ApiRequest;
    app: import("./slice/appSlice").appState;
    map: import("./slice/mapSlice").mapState;
    marker: import("./slice/markerSlice").MarkerState;
}>, import("redux").Dispatch<import("redux").AnyAction>>]>>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
