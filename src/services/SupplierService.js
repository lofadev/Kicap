import { axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils/utils';

const createSupplier = (data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.post('/supplier/create', data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const getSuppliers = (params, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/supplier/get-all', {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const getSupplier = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get(`/supplier/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const updateSupplier = (id, data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put(`/supplier/update/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const deleteSupplier = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete(`/supplier/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const SupplierService = {
  createSupplier,
  updateSupplier,
  getSupplier,
  getSuppliers,
  deleteSupplier,
};

export default SupplierService;
