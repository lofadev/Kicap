import { axiosJWT } from '~/api/apiConfig';

const createShipper = async (data, token) => {
  const res = await axiosJWT.post('/shipper/create', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateShipper = async (id, data, token) => {
  const res = await axiosJWT.put(`/shipper/update/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getShippers = async (payload, token) => {
  const res = await axiosJWT.get('/shipper/get-all', {
    params: payload,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getShipper = async (id, token) => {
  const res = await axiosJWT.get(`/shipper/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteShipper = async (id, token) => {
  const res = await axiosJWT.delete(`/shipper/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const ShipperService = {
  createShipper,
  updateShipper,
  getShipper,
  getShippers,
  deleteShipper,
};

export default ShipperService;
