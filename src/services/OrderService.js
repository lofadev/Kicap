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

const deleteOrder = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete('/order/delete/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const updateOrder = (id, payload, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put('/order/update/' + id, payload, {
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

const getOrdersByUserID = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/order/get-all/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

const OrderService = {
  createOrder,
  createOrderNoToast,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
  getOrdersByUserID,
};
export default OrderService;
