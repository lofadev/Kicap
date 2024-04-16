import { axiosInstance, axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils';

const createProductImage = (payload, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.post('/product-image/create', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }),
    dispatch
  );
};

const getProductImage = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get(`/product-image/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getProductImages = (id, dispatch) =>
  handleAPICallWithoutToast(
    axiosInstance.get('/product-image/get-all', {
      params: { id },
    }),
    dispatch
  );

const updateProductImage = (id, payload, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put(`/product-image/update/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }),
    dispatch
  );
};

const deleteProductImage = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete(`/product-image/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getMaxOrder = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/product-image/max-order', {
      params: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const ProductImageService = {
  createProductImage,
  updateProductImage,
  getProductImage,
  getProductImages,
  deleteProductImage,
  getMaxOrder,
};

export default ProductImageService;
