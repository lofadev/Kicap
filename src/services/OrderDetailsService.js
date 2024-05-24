import { axiosJWT, handleAPICallWithoutToast } from '~/api/apiConfig';
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

const OrderDetailsService = { getOrderDetails };
export default OrderDetailsService;
