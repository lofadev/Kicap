import { axiosJWT, handleAPICall } from '~/api/apiConfig';

const createSupplier = (data, token, dispatch) =>
  handleAPICall(
    axiosJWT.post('/supplier/create', data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch,
    true
  );

const updateSupplier = (id, data, token, dispatch) =>
  handleAPICall(
    axiosJWT.put(`/supplier/update/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch,
    true
  );

const getSuppliers = (params, token, dispatch) =>
  handleAPICall(
    axiosJWT.get('/supplier/get-all', {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );

const getSupplier = (id, token, dispatch) =>
  handleAPICall(
    axiosJWT.get(`/supplier/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );

const deleteSupplier = (id, token, dispatch) =>
  handleAPICall(
    axiosJWT.delete(`/supplier/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch,
    true
  );

const SupplierService = {
  createSupplier,
  updateSupplier,
  getSupplier,
  getSuppliers,
  deleteSupplier,
};

export default SupplierService;
