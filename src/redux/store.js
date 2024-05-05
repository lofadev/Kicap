import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import toastReducer from './slices/ToastSlice.js';
import userReducer from './slices/UserSlice.js';
import loadingReducer from './slices/LoadingSlice.js';
import cartReducer from './slices/CartSlice.js';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  toast: toastReducer,
  user: userReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
