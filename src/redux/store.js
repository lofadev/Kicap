import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/CartSlice.js';
import loadingReducer from './slices/LoadingSlice.js';
import toastReducer from './slices/ToastSlice.js';
import userReducer from './slices/UserSlice.js';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    toast: toastReducer,
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
