import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { formatPriceToVND } from '~/utils';
import Button from '../Button/Button';
import './ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct } from '~/redux/slices/CartSlice';
import { updateToast } from '~/redux/slices/ToastSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const price = formatPriceToVND(product.price);
  const salePrice = formatPriceToVND(product.salePrice);
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    if (product.hasVariant) {
      navigate(`/product/${product.slug}`, { state: { id: product._id } });
    } else {
      const { name, salePrice, image, stock } = product;
      const productItem = {
        title: name,
        price: salePrice,
        image,
        quantity: 1,
        stock,
        variant: '',
      };
      dispatch(addOrderProduct(productItem));
      if (cart.outOfStock) {
        dispatch(
          updateToast({
            status: 'error',
            message: 'Số lượng sản phẩm đã đạt giới hạn',
          })
        );
      } else {
        dispatch(
          updateToast({
            status: 'ok',
            message: 'Thêm sản phẩm vào giỏ hàng thành công',
          })
        );
      }
    }
  };
  return (
    <div className='product_card'>
      {product.discount > 0 && <span className='sale_box'>{`- ${product.discount}%`}</span>}
      <div className='product_card-inner'>
        <Link
          to={{
            pathname: `/product/${product.slug}`,
          }}
          state={{ id: product._id }}
          className='product_url'
        >
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
        </Link>
        <div className='product_card-actions' onClick={handleAddToCart}>
          <Button secondary className='product_card-button' disabled={!product.stock}>
            {product.hasVariant
              ? 'Tùy chọn'
              : product.stock === 0
              ? 'Hết hàng'
              : 'Thêm vào giỏ hàng'}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default ProductCard;
