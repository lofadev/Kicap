import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  province: '',
  avatar: '',
  accessToken: '',
  refreshToken: '',
  isAdmin: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = '',
        email = '',
        accessToken = '',
        address = '',
        phone = '',
        avatar = '',
        _id = '',
        isAdmin,
        province = '',
        refreshToken = '',
      } = action.payload;
      state.id = _id ? _id : state.id;
      state.name = name ? name : state.name;
      state.email = email ? email : state.email;
      state.phone = phone ? phone : state.phone;
      state.address = address ? address : state.address;
      state.province = province ? province : state.province;
      state.avatar = avatar ? avatar : state.avatar;
      state.accessToken = accessToken ? accessToken : state.accessToken;
      state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
      state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
    },
    resetUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.province = '';
      state.avatar = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.isAdmin = false;
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
