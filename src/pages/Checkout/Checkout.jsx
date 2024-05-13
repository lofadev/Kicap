import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '~/components/Button/Button';
import Input from '~/components/FormGroup/Input/Input';
import Radio from '~/components/Radio/Radio';
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import ProvinceService from '~/services/ProvinceService';
import { formatPriceToVND } from '~/utils/utils';
import { infoCheckoutSchema } from '~/validate/YupSchema';
import './Checkout.scss';
import CheckoutItem from './CheckoutItem/CheckoutItem';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
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
      console.log(data);
    },
  });

  useEffect(() => {
    if (cart.orderItems.length === 0) {
      navigate('/cart');
      return;
    }
    const fetchData = async () => {
      const res = await ProvinceService.getProvinces({});
      if (res.status === 'OK') {
        const options = res.data.map((province) => {
          return {
            id: province.provinceId,
            name: province.provinceName,
          };
        });
        setProvinces(options);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='checkout'>
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
