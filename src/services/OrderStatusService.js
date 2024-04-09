import { axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils';

const createOrderStatus = (data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.post('/order-status/create', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getOrderStatus = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get(`/order-status/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getOrderStatuses = (payload, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/order-status/get-all', {
      params: payload,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const updateOrderStatus = (id, data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put(`/order-status/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const deleteOrderStatus = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete(`/order-status/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const OrderStatusService = {
  createOrderStatus,
  updateOrderStatus,
  getOrderStatus,
  getOrderStatuses,
  deleteOrderStatus,
};

export default OrderStatusService;
