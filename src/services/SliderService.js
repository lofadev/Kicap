import { axiosJWT, handleAPICall } from '~/api/apiConfig';

const createSlider = (data, token, dispatch) =>
  handleAPICall(
    axiosJWT.post('/slider/create', data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch,
    true
  );

const updateSlider = (id, data, token, dispatch) =>
  handleAPICall(
    axiosJWT.put(`/slider/update/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch,
    true
  );

const getSliders = (payload, token, dispatch) =>
  handleAPICall(
    axiosJWT.get('/slider/get-all', {
      params: payload,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );

const getSlider = (id, token, dispatch) =>
  handleAPICall(
    axiosJWT.get(`/slider/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );

const deleteSlider = (id, token, dispatch) =>
  handleAPICall(
    axiosJWT.delete(`/slider/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch,
    true
  );

const SliderService = {
  createSlider,
  updateSlider,
  getSlider,
  getSliders,
  deleteSlider,
};

export default SliderService;
