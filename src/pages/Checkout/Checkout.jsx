import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import AlertDialog from '~/components/AlertDialog/AlertDialog';
import Button from '~/components/Button/Button';
import Input from '~/components/FormGroup/Input/Input';
import Radio from '~/components/Radio/Radio';
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import { setAmount } from '~/redux/slices/CartSlice';
import CheckoutService from '~/services/CheckoutService';
import OrderService from '~/services/OrderService';
import ProductService from '~/services/ProductService';
import ProvinceService from '~/services/ProvinceService';
import { formatPriceToVND } from '~/utils/utils';
import { infoCheckoutSchema } from '~/validate/YupSchema';
import './Checkout.scss';
import CheckoutItem from './CheckoutItem/CheckoutItem';

const Checkout = () => {
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [checkAmounts, setCheckAmount] = useState([]);

  const formik = useFormik({
    initialValues: {
      email: user.email || '',
      fullName: user.name || '',
      phone: user.phone || '',
      address: user.address || '',
      province: user.province || '',
      note: '',
      paymentMethod: 'cod',
    },
    validationSchema: infoCheckoutSchema,
    onSubmit: async (data) => {
      const { paymentMethod, address, province, fullName, note, email, phone } = data;
      const orderID = uuidv4();
      const productItems = cart.orderItems.map((item) => {
        return {
          orderID,
          name: item.title,
          image: item.image,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant,
        };
      });
      const payload = {
        orderID,
        userID: user.id,
        deliveryAddress: address,
        deliveryProvince: province,
        email,
        fullName,
        phone,
        note,
        paymentMethod,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        orderItems: productItems,
      };
      if (paymentMethod === 'cod') {
        const res = await OrderService.createOrder(payload, dispatch);
        if (res.status === 'OK') {
          console.log(res);
        }
      } else {
        const payloadPayment = {
          orderID,
          amount: cart.totalPrice + cart.shippingPrice,
          bankCode: 'VNBANK',
          orderDescription: 'Thanh toan hoa don',
        };
        const res = await CheckoutService.createPaymentUrl(payloadPayment);
        window.open(res.paymentUrl);
      }
    },
  });

  useEffect(() => {
    const { setValues } = formik;
    setValues({
      email: user.email || '',
      fullName: user.name || '',
      phone: user.phone || '',
      address: user.address || '',
      province: user.province || '',
      note: '',
      paymentMethod: 'cod',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    document.title = 'Thanh toán | Kicap';
    if (cart.orderItems.length === 0) {
      navigate('/cart');
      return;
    }
    const fetchData = async () => {
      const ids = cart.orderItems.map((item) => {
        const id = item.idVariant ?? item.id;
        return id;
      });
      const [provinces, checkAmount] = await Promise.all([
        ProvinceService.getProvinces({}),
        ProductService.checkAmount(ids, dispatch),
      ]);
      if (provinces.status === 'OK') {
        const options = provinces.data.map((province) => {
          return {
            id: province.provinceId,
            name: province.provinceName,
          };
        });
        setProvinces(options);
      }
      if (checkAmount.status === 'OK') {
        const checkAmounts = checkAmount.data;
        setCheckAmount(checkAmounts);
        const orderItemsLength = cart.orderItems.length;
        let isOutOfStock = false;
        for (let i = 0; i < orderItemsLength; i++) {
          const item = cart.orderItems[i];
          const id = item.idVariant ?? item.id;
          const itemCheck = checkAmounts.find((i) => i.id === id);
          if (itemCheck.stock < item.quantity) {
            isOutOfStock = true;
            break;
          }
        }
        if (isOutOfStock) {
          setOpenModal(true);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAcceptDecreaseAmount = () => {
    setOpenModal(false);
    const orderItemsLength = cart.orderItems.length;
    for (let i = 0; i < orderItemsLength; i++) {
      const item = cart.orderItems[i];
      const id = item.idVariant ?? item.id;
      const itemCheck = checkAmounts.find((i) => i.id === id);
      if (itemCheck.stock < item.quantity) {
        dispatch(setAmount({ sku: item.sku, quantity: itemCheck.stock }));
      }
    }
  };

  return (
    <div className='checkout'>
      <AlertDialog
        open={openModal}
        handleOk={handleAcceptDecreaseAmount}
        title={'Thông báo.'}
        desc={
          'Một số sản phẩm của bạn chọn đã vượt mức tồn khi của chúng tôi. Vì vậy chúng tôi đã cập nhật lại số lượng sản phẩm ở mức tối đa cho bạn. Mong bạn thông cảm cho chúng tôi về vấn đề này. Nếu có thắc mắc, xin vui lòng liên hệ admin: contact.lofa@gmail.com'
        }
      />
      <div className='container'>
        <div className='checkout-menu'>
          <div className='checkout-items'>
            <h2 className='checkout-items-title'>Thông tin nhận hàng</h2>

            <div className='checkout-items-info'>
              <Input
                name='email'
                labelName='Email (tùy chọn)'
                placeholder='Nhập địa chỉ email...'
                formik={formik}
              />
              <Input
                name='fullName'
                labelName='Họ và tên'
                placeholder='Nhập họ và tên...'
                formik={formik}
                required
              />
              <Input
                name='phone'
                labelName='Số điện thoại'
                placeholder='Nhập số điện thoại...'
                formik={formik}
                required
              />
              <Input
                name='address'
                labelName='Địa chỉ'
                placeholder='Nhập địa chỉ ...'
                formik={formik}
                required
              />
              <SelectOptions
                labelName='Tỉnh/thành phố'
                name='province'
                optionDefault={'--- Chọn tỉnh/thành phố ---'}
                formik={formik}
                options={provinces}
                value='name'
                required
              />
              <Input
                labelName='Ghi chú'
                placeholder='Nhập ghi chú dành cho shop...'
                name='note'
                textarea
                formik={formik}
              />
              <Radio
                name='paymentMethod'
                labelName={'Phương thức thanh toán'}
                options={[
                  { name: 'Thanh toán khi nhận hàng', value: 'cod' },
                  { name: 'Thanh toán qua VN Pay', value: 'vnpay' },
                ]}
                formik={formik}
              />
            </div>
          </div>

          <div className='checkout-items'>
            <h2 className='checkout-items-title title-order'>
              Đơn hàng ({cart.orderItems.length} sản phẩm)
            </h2>

            {cart.orderItems.map((item) => (
              <CheckoutItem key={item.sku} item={item} />
            ))}

            <div className='checkout-info'>
              <div className='checkout-info-provisional'>
                <span>Tạm tính:</span>
                <span>{formatPriceToVND(cart.totalPrice)}</span>
              </div>
              <div className='checkout-info-shipping-fee'>
                <span>Phí vận chuyển:</span>
                <span>{formatPriceToVND(cart.shippingPrice)}</span>
              </div>
              <div className='checkout-info-totalprice'>
                <span>Tổng cộng:</span>
                <span>{formatPriceToVND(cart.totalPrice + cart.shippingPrice)}</span>
              </div>
              <Button primary className='btn-order' onClick={formik.handleSubmit}>
                Đặt hàng
              </Button>
              <Button secondary to={'/cart'} className='btn-goto-cart'>
                Quay về giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
