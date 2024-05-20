import axios from 'axios';
import { setLoading } from '~/redux/slices/LoadingSlice';
import { updateToast } from '~/redux/slices/ToastSlice';

export const axiosJWT = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_KEY,
  timeout: 10000,
});

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_KEY,
  timeout: 10000,
});

export const handleAPICall = async (apiCall, dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await apiCall;
    if (res.status === 200) {
      dispatch(
        updateToast({
          status: 'ok',
          message: res.data.message,
        })
      );
      return res.data;
    }
  } catch (error) {
    console.log(error);
    dispatch(
      updateToast({
        status: 'error',
        message: error.response.data.message,
      })
    );
    return error.response.data;
  } finally {
    dispatch(setLoading(false));
  }
};

export const handleAPICallWithoutToast = async (apiCall, dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await apiCall;
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
    dispatch(
      updateToast({
        status: 'error',
        message: error.response.data.message,
      })
    );
    return error.response.data;
  } finally {
    dispatch(setLoading(false));
  }
};
