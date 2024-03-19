import axios from 'axios';

const axiosJWT = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_KEY });
const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_KEY });

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

const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

const refreshToken = async (refreshToken) => {
  const res = await axios.post(
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
  axiosInstance,
  refreshToken,
};

export default UserService;
