import { useDispatch } from 'react-redux';
import FormQuantity from '~/components/FormQuantity/FormQuantity';
import { formatPriceToVND } from '~/utils';
import './CartItem.scss';

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {};

  const handleDecreaseQuantity = () => {};

  const handleOnChangeQuantity = () => {};
  return (
    <div className='cart-item'>
      <div className='cart-item-image'>
        <img src={cartItem?.image} alt='' />
      </div>

      <div className='cart-item-content'>
        <h2 className='cart-item-title'>
          {cartItem?.title}
          <br />
          {!!cartItem.variant && (
            <span style={{ color: 'var(--light-gray)' }}>{cartItem.variant}</span>
          )}
        </h2>
        <span className='cart-item-price'>{formatPriceToVND(cartItem?.price)}</span>
        <div className='cart-item-actions'>
          <span>Xoá</span>
          <FormQuantity
            quantity={cartItem?.quantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onIncreaseQuantity={handleIncreaseQuantity}
            onChangeQuantity={handleOnChangeQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
