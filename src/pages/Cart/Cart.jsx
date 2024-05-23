import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import EmptyCart from '~/assets/imgs/empty-cart.png';
import Button from '~/components/Button/Button';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import { formatPriceToVND } from '~/utils/utils';
import './Cart.scss';
import CartItem from './CartItem/CartItem';

const Cart = () => {
  // eslint-disable-next-line no-unused-vars
  const cart = useSelector((state) => state.cart);
  const orderItemsCount = cart.orderItems.length;
  useEffect(() => {
    document.title = 'Giỏ hàng | Kicap';
  }, []);
  return (
    <div className='shopping-cart'>
      <SectionBreadCrumb child='Giỏ hàng'></SectionBreadCrumb>
      <div className='container'>
        <div className='shopping-cart-main'>
          <h1 className='shopping-cart-heading'>
            Giỏ hàng{' '}
            <span>
              (<span className='count-item'>{orderItemsCount}</span> sản phẩm)
            </span>
          </h1>
          {orderItemsCount === 0 && (
            <>
              <div className='empty-cart'>
                <img src={EmptyCart} alt='' />
              </div>
              <Button secondary className='btn-continue' to={'/products'}>
                tiếp tục mua sắm
              </Button>
            </>
          )}

          {orderItemsCount !== 0 && (
            <div className='cart-main'>
              <div className='cart-items'>
                {cart.orderItems?.map((item) => (
                  <CartItem key={item.title} cartItem={item} />
                ))}
              </div>

              <div className='cart-info'>
                <div className='cart-info-provisional'>
                  <span>Tạm tính:</span>
                  <span>{formatPriceToVND(cart.totalPrice)}</span>
                </div>
                <div className='cart-info-totalprice'>
                  <span>Thành tiền:</span>
                  <span>{formatPriceToVND(cart.totalPrice)}</span>
                </div>
                <Button primary className='btn-payment' to={'/checkout'}>
                  Thanh toán ngay
                </Button>
                <Button secondary to={'/products'} className='btn-continue-view'>
                  Tiếp tục mua hàng
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
