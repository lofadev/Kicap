import { axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils/utils';

const createCategory = (data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.post('/category/create', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getCategory = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get(`/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getCategorys = (payload, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/category/get-all', {
      params: payload,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const updateCategory = (id, data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put(`/category/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const deleteCategory = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete(`/category/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const CategoryService = {
  createCategory,
  updateCategory,
  getCategory,
  getCategorys,
  deleteCategory,
};

export default CategoryService;
