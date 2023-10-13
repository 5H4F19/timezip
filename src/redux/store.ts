import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {api} from './api';
import profile from './slices/profile';
import withdrawal from './slices/withdrawal';
export const rootReducer = combineReducers({
  profile,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
