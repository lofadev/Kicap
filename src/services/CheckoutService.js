import { axiosJWT } from '~/api/apiConfig';

const createPaymentUrl = async (data) => {
  try {
    const res = await axiosJWT.post('/checkout/create_payment_url', data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const CheckoutService = { createPaymentUrl };
export default CheckoutService;
