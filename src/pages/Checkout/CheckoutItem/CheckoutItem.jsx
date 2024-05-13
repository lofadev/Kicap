import { formatPriceToVND } from '~/utils/utils';
import './CheckoutItem.scss';

const CheckoutItem = ({ item }) => {
  const { image, quantity, title, variant, price } = item;
  return (
    <div className='checkout-item'>
      <div className='checkout-item-main'>
        <div className='checkout-item-image'>
          <img src={image} alt='' />
          <span className='checkout-item-quantity'>{quantity}</span>
        </div>

        <div className='checkout-item-content'>
          <h3 className='checkout-item-title'>{title}</h3>
          <span className='checkout-item-variant'>{variant}</span>
        </div>
      </div>

      <span className='checkout-item-price'>{formatPriceToVND(price * quantity)}</span>
    </div>
  );
};

export default CheckoutItem;
