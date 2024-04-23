import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './ProductCard.scss';
import { formatPriceToVND } from '~/utils';

const ProductCard = ({ product }) => {
  const price = formatPriceToVND(product.price);
  const salePrice = formatPriceToVND(product.salePrice);
  return (
    <div className='product_card'>
      <Link
        to={{
          pathname: `/product/${product.slug}`,
        }}
        state={{ id: product._id }}
        className='product_url'
      >
        {product.discount > 0 && <span className='sale_box'>{`- ${product.discount}%`}</span>}
        <div className='product_card-inner'>
          <div className='product_card-image'>
            <img
              loading='lazy'
              className={'product_card-image-front'}
              src={product.image}
              alt={product.image}
            />
            <img
              loading='lazy'
              className={'product_card-image-back'}
              src={product.more_image}
              alt={product.more_image}
            />
          </div>

          <div className='product-card-main'>
            <h4 className='product_card-type'>{product.category}</h4>
            <h3 className='product_card-title'>{product.name}</h3>
            <div className='product_card-price'>
              <strong>{salePrice}</strong>
              {product.discount > 0 && <span>{price}</span>}
            </div>
          </div>

          <div className='product_card-actions'>
            <Button secondary className='product_card-button'>
              {product.stock === null
                ? 'Tùy chọn'
                : product.stock === 0
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
  product: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default ProductCard;
