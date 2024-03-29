import axios from 'axios';
import { setLoading } from '~/redux/slides/LoadingSlider';
import { updateToast } from '~/redux/slides/ToastSlide';

export const axiosJWT = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_KEY,
});

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_KEY,
});

export const handleAPICall = async (apiCall, dispatch, showSuccess = false) => {
  try {
    dispatch(setLoading(true));
    const res = await apiCall();
    if (showSuccess)
      dispatch(
        updateToast({
          status: 'ok',
          message: res.data.message,
        })
      );
    return res.data;
  } catch (error) {
    dispatch(
      updateToast({
        status: 'error',
        message: error.response.data.message,
      })
    );
  } finally {
    dispatch(setLoading(false));
  }
};
