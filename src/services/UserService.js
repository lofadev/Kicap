import { axiosInstance, axiosJWT } from '~/api/apiConfig';

const registerUser = async (data) => {
  const res = await axiosInstance.post('/user/sign-up', data);
  return res.data;
};

const loginUser = async (data) => {
  const res = await axiosInstance.post('/user/sign-in', data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post('/user/sign-out');
  return res.data;
};

const getDetailsUser = async (id, token) => {
  const res = await axiosJWT.get(`/user/${id}`, {
    headers: { Authorization: 'Bearer ' + token },
  });
  return res.data;
};

const refreshToken = async (refreshToken) => {
  const res = await axiosInstance.post(
    '/user/refresh-token',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  return res.data;
};

const UserService = {
  registerUser,
  loginUser,
  logoutUser,
  getDetailsUser,
  axiosJWT,
  refreshToken,
};

export default UserService;
