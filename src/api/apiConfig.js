import axios from 'axios';

export const axiosJWT = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_KEY,
});

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_KEY,
});
