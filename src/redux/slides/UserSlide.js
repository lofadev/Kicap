import { createSlice } from '@reduxjs/toolkit';

export const userSlide = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    accessToken: '',
    refreshToken: '',
    avatar: '',
    isAdmin: '',
  },
  reducers: {
    updateUser: (state, action) => {},
  },
});

export const { updateUser } = userSlide.actions;

export default userSlide.reducer;
