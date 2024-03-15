import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    status: '',
    title: '',
    message: '',
  },
  reducers: {
    updateToast: (state, action) => {
      const { status, title, message } = action.payload;
      state.status = status ? status : state.status;
      state.title = title ? title : state.title;
      state.message = message ? message : state.message;
    },
    resetToast: (state) => {
      state.status = '';
      state.title = '';
      state.message = '';
    },
  },
});

export const { updateToast, resetToast } = toastSlice.actions;

export default toastSlice.reducer;
