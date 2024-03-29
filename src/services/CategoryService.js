import { axiosJWT, handleAPICall } from '~/api/apiConfig';

const createCategory = async (data, token, dispatch) =>
  handleAPICall(
    () =>
      axiosJWT.post('/category/create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    dispatch,
    true
  );

const updateCategory = async (id, data, token, dispatch) =>
  handleAPICall(
    () =>
      axiosJWT.put(`/category/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    dispatch,
    true
  );

const getCategory = async (id, token, dispatch) =>
  handleAPICall(
    () =>
      axiosJWT.get(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    dispatch
  );

const getCategorys = async (payload, token, dispatch) =>
  handleAPICall(
    () =>
      axiosJWT.get('/category/get-all', {
        params: payload,
        headers: { Authorization: `Bearer ${token}` },
      }),
    dispatch
  );

const deleteCategory = async (id, token, dispatch) =>
  handleAPICall(
    () =>
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
