import { axiosJWT, handleAPICall } from '~/api/apiConfig';

const createShipper = (data, token, dispatch) =>
  handleAPICall(
    axiosJWT.post('/shipper/create', data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch,
    true
  );

const updateShipper = (id, data, token, dispatch) =>
  handleAPICall(
    axiosJWT.put(`/shipper/update/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch,
    true
  );

const getShippers = (payload, token, dispatch) =>
  handleAPICall(
    axiosJWT.get('/shipper/get-all', {
      params: payload,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );

const getShipper = (id, token, dispatch) =>
  handleAPICall(
    axiosJWT.get(`/shipper/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );

const deleteShipper = (id, token, dispatch) =>
  handleAPICall(
    axiosJWT.delete(`/shipper/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch,
    true
  );

const ShipperService = {
  createShipper,
  updateShipper,
  getShipper,
  getShippers,
  deleteShipper,
};

export default ShipperService;
