import { useEffect, useState } from 'react';
import EmptyCart from '~/assets/imgs/empty-cart.png';
import Button from '~/components/Button/Button';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import './Cart.scss';

const Cart = () => {
  // eslint-disable-next-line no-unused-vars
  const [countItem, setCountItem] = useState(0);
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
              (<span className='count-item'>{countItem}</span> sản phẩm)
            </span>
          </h1>
          {countItem == 0 && (
            <div className='empty-cart'>
              <img src={EmptyCart} alt='' />
            </div>
          )}

          <Button secondary className='btn-continue' to={'/collections/all'}>
            tiếp tục mua sắm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
