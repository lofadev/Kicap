import { axiosInstance, axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils';

const createSlider = (data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.post('/slider/create', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }),
    dispatch
  );
};

const getSliders = (payload, dispatch) => {
  return handleAPICallWithoutToast(
    axiosInstance.get('/slider/get-all', {
      params: payload,
    }),
    dispatch
  );
};

const getSlider = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get(`/slider/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const updateSlider = (id, data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put(`/slider/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }),
    dispatch
  );
};

const deleteSlider = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete(`/slider/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const SliderService = {
  createSlider,
  updateSlider,
  getSlider,
  getSliders,
  deleteSlider,
};

export default SliderService;
