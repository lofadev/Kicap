import { axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils/utils';

const getOrderDetails = (payload, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/order-detail/details-of-order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: payload,
    }),
    dispatch
  );
};

const updateOrderDetails = (id, payload, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put('/order-detail/update/' + id, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};
const deleteOrderDetails = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete('/order-detail/delete/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const OrderDetailsService = { getOrderDetails, updateOrderDetails, deleteOrderDetails };
export default OrderDetailsService;
