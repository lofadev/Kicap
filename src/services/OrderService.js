import { axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils/utils';

const createOrder = (data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.post('/order/create', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const createOrderNoToast = (data, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.post('/order/create', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getOrders = (payload, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/order/get-all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: payload,
    }),
    dispatch
  );
};

const getOrder = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/order/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const OrderService = { createOrder, createOrderNoToast, getOrders, getOrder };
export default OrderService;
