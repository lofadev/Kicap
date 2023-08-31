import Proptypes from "prop-types";
import Button from "../Button/Button";
import "./ProductCard.scss";

const ProductCard = ({ data }) => {
  const formattedPrice = data.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  const salePrice = data.price - (data.price * data.salePercent) / 100;
  const roundedSalePrice = Math.ceil(salePrice / 1000) * 1000;

  const formattedSalePrice = roundedSalePrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="product_card" key={data.id}>
      <a href="" className="product_url"></a>
      {data.salePercent && <span className="sale_box">{`- ${data.salePercent}%`}</span>}
      <div className="product_card-inner">
        <div className="product_card-image">
          <img className={`product_card-image-front`} src={data.image1} alt="" />
          <img className={`product_card-image-back`} src={data.image2} alt="" />
        </div>

        <div className="product-card-main">
          <h4 className="product_card-type">{data.type}</h4>
          <h3 className="product_card-title">{data.title}</h3>
          <div className="product_card-price">
            <strong>{formattedSalePrice}</strong>
            {data.salePercent && <span>{formattedPrice}</span>}
          </div>
        </div>

        <div className="product_card-actions">
          <Button secondary type="a" className="product_card-button">
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  data: Proptypes.object.isRequired,
};

export default ProductCard;
