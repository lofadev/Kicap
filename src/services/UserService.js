import axios from 'axios';

const axiosJWT = axios.create();

const registerUser = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_KEY}/user/sign-up`, data);
  return res.data;
};

const loginUser = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_KEY}/user/sign-in`, data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_KEY}/user/sign-out`);
  return res.data;
};

const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_REACT_APP_API_KEY}/user/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

const refreshToken = async (refreshToken) => {
  const res = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_KEY}/user/refresh-token`,
    {},
    {
      headers: {
        token: `Bearer ${refreshToken}`,
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
