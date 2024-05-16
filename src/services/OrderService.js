import { axiosJWT, handleAPICall } from '~/api/apiConfig';
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

const OrderService = { createOrder };
export default OrderService;
