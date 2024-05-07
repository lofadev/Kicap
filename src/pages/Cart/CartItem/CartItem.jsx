import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FormQuantity from '~/components/FormQuantity/FormQuantity';
import {
  decreaseAmount,
  increaseAmount,
  removeOrderProduct,
  setAmount,
} from '~/redux/slices/CartSlice';
import { formatPriceToVND, isStrNumber } from '~/utils/utils';
import './CartItem.scss';

const CartItem = ({ cartItem }) => {
  const { id, slug, sku, price, variant, quantity, title, image } = cartItem;
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(increaseAmount(sku));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseAmount(sku));
  };

  const handleOnChangeQuantity = (e) => {
    const value = e.target.value;
    if (isStrNumber(value) && parseInt(value || 1) <= 200) {
      dispatch(setAmount({ sku, quantity: value }));
    }
  };

  const handleSetDefaultAmount = (e) => {
    const value = e.target.value;
    if (value === '') dispatch(setAmount({ sku, quantity: 1 }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeOrderProduct(sku));
  };
  return (
    <div className='cart-item'>
      <div className='cart-item-image'>
        <img src={image} alt='' />
      </div>

      <div className='cart-item-content'>
        <h2 className='cart-item-title'>
          <Link
            to={`/product/${slug}`}
            state={{ id: id }}
            className='cart-item-link'
            style={{ paddingLeft: 0 }}
          >
            {title}
          </Link>
          <br />
          {!!variant && <span style={{ color: 'var(--light-gray)' }}>{variant}</span>}
        </h2>
        <span className='cart-item-price'>{formatPriceToVND(price)}</span>
        <div className='cart-item-actions'>
          <span className='cart-item-link' onClick={handleRemoveProduct}>
            Xoá
          </span>
          <FormQuantity
            quantity={quantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onIncreaseQuantity={handleIncreaseQuantity}
            onChangeQuantity={handleOnChangeQuantity}
            onBlur={handleSetDefaultAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
