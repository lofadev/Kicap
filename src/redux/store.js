import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slides/CounterSlide.js';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
