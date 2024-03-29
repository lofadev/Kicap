import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    status: '',
    message: '',
  },
  reducers: {
    updateToast: (state, action) => {
      const { status, message } = action.payload;
      state.status = status ? status : state.status;
      state.message = message ? message : state.message;
    },
    resetToast: (state) => {
      state.status = '';
      state.message = '';
    },
  },
});

export const { updateToast, resetToast } = toastSlice.actions;

export default toastSlice.reducer;
