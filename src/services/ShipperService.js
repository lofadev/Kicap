import { axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils';

const createShipper = (data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.post('/shipper/create', data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const getShippers = (payload, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/shipper/get-all', {
      params: payload,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const getShipper = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get(`/shipper/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const updateShipper = (id, data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put(`/shipper/update/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const deleteShipper = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete(`/shipper/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const ShipperService = {
  createShipper,
  updateShipper,
  getShipper,
  getShippers,
  deleteShipper,
};

export default ShipperService;
