import { axiosJWT } from '~/api/apiConfig';

const createSupplier = async (data, token) => {
  const res = await axiosJWT.post('/supplier/create', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateSupplier = async (id, data, token) => {
  const res = await axiosJWT.put(`/supplier/update/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getSuppliers = async (params, token) => {
  const res = await axiosJWT.get('/supplier/get-all', {
    params: params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getSupplier = async (id, token) => {
  const res = await axiosJWT.get(`/supplier/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteSupplier = async (id, token) => {
  const res = await axiosJWT.delete(`/supplier/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const SupplierService = {
  createSupplier,
  updateSupplier,
  getSupplier,
  getSuppliers,
  deleteSupplier,
};

export default SupplierService;
