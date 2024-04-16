import { axiosInstance, axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils';

const createProductVariant = (data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.post('/product-variant/create', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getProductVariant = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get(`/product-variant/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getProductVariants = (id, dispatch) =>
  handleAPICallWithoutToast(
    axiosInstance.get('/product-variant/get-all', {
      params: { id },
    }),
    dispatch
  );

const updateProductVariant = (id, data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put(`/product-variant/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const deleteProductVariant = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete(`/product-variant/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const ProductVariantService = {
  createProductVariant,
  updateProductVariant,
  getProductVariant,
  getProductVariants,
  deleteProductVariant,
};

export default ProductVariantService;
