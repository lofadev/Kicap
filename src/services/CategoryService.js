import { axiosJWT, handleAPICall } from '~/api/apiConfig';

const createCategory = (data, token, dispatch) =>
  handleAPICall(
    axiosJWT.post('/category/create', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch,
    true
  );

const updateCategory = (id, data, token, dispatch) =>
  handleAPICall(
    axiosJWT.put(`/category/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch,
    true
  );

const getCategory = (id, token, dispatch) =>
  handleAPICall(
    axiosJWT.get(`/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );

const getCategorys = (payload, token, dispatch) =>
  handleAPICall(
    axiosJWT.get('/category/get-all', {
      params: payload,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );

const deleteCategory = (id, token, dispatch) =>
  handleAPICall(
    axiosJWT.delete(`/category/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch,
    true
  );

const CategoryService = {
  createCategory,
  updateCategory,
  getCategory,
  getCategorys,
  deleteCategory,
};

export default CategoryService;
