import { axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils';

const createProduct = (data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.post('/product/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getProducts = (params, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/product/get-all', {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const getProduct = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get(`/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const updateProduct = (id, payload, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put(`/product/update/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }),
    dispatch
  );
};

const updateProductMoreImage = (id, payload, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.put(`/product/update/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const deleteProduct = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete(`/product/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};
const ProductService = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  updateProductMoreImage,
};

export default ProductService;
