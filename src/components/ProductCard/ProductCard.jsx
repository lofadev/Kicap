import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import unidecode from 'unidecode';
import Button from '../Button/Button';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const formattedPrice = product.price[0].toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const discount = product.price[0] - (product.price[0] * product.discount[0]) / 100;
  const roundedDiscount = Math.ceil(discount / 1000) * 1000;

  const formattedDiscount = roundedDiscount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const productTitleParams = unidecode(product.title.toLowerCase())
    .split(' ')
    .map((word) => word.replace(/[^\w\s-]/g, ''))
    .filter((word) => word !== '-')
    .join('-');

  return (
    <div className='product_card' key={product.id}>
      <Link to={`/product/${productTitleParams}`} className='product_url'>
        {product.discount[0] > 0 && <span className='sale_box'>{`- ${product.discount[0]}%`}</span>}
        <div className='product_card-inner'>
          <div className='product_card-image'>
            <img
              className={'product_card-image-front'}
              src={product.images[0]}
              alt={product.images[0]}
            />
            <img
              className={'product_card-image-back'}
              src={product.images[1]}
              alt={product.images[1]}
            />
          </div>

          <div className='product-card-main'>
            <h4 className='product_card-type'>{product.type}</h4>
            <h3 className='product_card-title'>{product.title}</h3>
            <div className='product_card-price'>
              <strong>{formattedDiscount}</strong>
              {product.discount[0] > 0 && <span>{formattedPrice}</span>}
            </div>
          </div>

          <div className='product_card-actions'>
            <Button secondary type='button' className='product_card-button'>
              {product.status[0] === null
                ? 'Tùy chọn'
                : product.status[0] === 0
                ? 'Hết hàng'
                : 'Thêm vào giỏ hàng'}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: Proptypes.object.isRequired,
  onClick: Proptypes.func,
};

export default ProductCard;
