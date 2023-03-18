import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiReducer, appReducer, mapReducer, markerReducer } from './slice';
import apiMiddleware from './apiMiddleware';

const rootReducer = combineReducers({
  api: apiReducer,
  app: appReducer,
  map: mapReducer,
  marker: markerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
