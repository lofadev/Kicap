import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import unidecode from "unidecode";
import Button from "../Button/Button";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const formattedPrice = product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  const salePrice = product.price - (product.price * product.salePercent) / 100;
  const roundedSalePrice = Math.ceil(salePrice / 1000) * 1000;

  const formattedSalePrice = roundedSalePrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const productTitleParams = unidecode(product.title.toLowerCase()).split(" ").join("-");

  return (
    <div className="product_card" key={product.id}>
      <Link to={`product/${productTitleParams}`} className="product_url">
        {product.salePercent && <span className="sale_box">{`- ${product.salePercent}%`}</span>}
        <div className="product_card-inner">
          <div className="product_card-image">
            <img className={`product_card-image-front`} src={product.images[0]} alt={product.images[0]} />
            <img className={`product_card-image-back`} src={product.images[1]} alt={product.images[1]} />
          </div>

          <div className="product-card-main">
            <h4 className="product_card-type">{product.type}</h4>
            <h3 className="product_card-title">{product.title}</h3>
            <div className="product_card-price">
              <strong>{formattedSalePrice}</strong>
              {product.salePercent && <span>{formattedPrice}</span>}
            </div>
          </div>

          <div className="product_card-actions">
            <Button secondary type="button" className="product_card-button">
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: Proptypes.object.isRequired,
};

export default ProductCard;
