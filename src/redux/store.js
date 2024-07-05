import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import { apiSlice } from './api/apislice';
import tacheSlice from './slices/tacheSlice';
// import counterReducer from './slices/counterSlice';

const store = configureStore({
  reducer: {
    user:userSlice,
    tache:tacheSlice,
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

