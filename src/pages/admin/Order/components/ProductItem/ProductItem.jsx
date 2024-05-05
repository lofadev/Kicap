import { BiSolidCartAdd } from 'react-icons/bi';
import './ProductItem.scss';
import FormQuantity from '~/components/FormQuantity/FormQuantity';
import { useState } from 'react';

const ProductItem = ({ handleAddProductToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleOnChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className='product-items'>
      <div className='product-image'>
        <img
          src='https://firebasestorage.googleapis.com/v0/b/kicap-c7161.appspot.com/o/images%2F1712477833812?alt=media&token=d5ebc47e-aa06-4feb-ab7e-64071298cdc2'
          alt=''
        />
      </div>
      <div className='product-content'>
        <h3>Tên sản phẩm</h3>
        <div className='product-content-bottom'>
          <span>Giá: </span>
          <span>
            <FormQuantity
              quantity={quantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onIncreaseQuantity={handleIncreaseQuantity}
              onChangeQuantity={handleOnChangeQuantity}
            />
          </span>
        </div>
      </div>
      <button className='product-btn-add' onClick={handleAddProductToCart}>
        <BiSolidCartAdd />
      </button>
    </div>
  );
};

export default ProductItem;
