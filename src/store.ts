import { configureStore } from '@reduxjs/toolkit';
import { app, map, marker } from './slice';

const store = configureStore({
  reducer: {
    app: app,
    map: map,
    marker: marker,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false
    }
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
