import Proptypes from "prop-types";
import { useState } from "react";
import Slider from "react-slick";
import "./SectionProduct.scss";

const SectionProduct = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const [productsState, setProductsState] = useState(products);

  const handleProductCardHover = (productId) => {
    const updatedProducts = productsState.map((product) =>
      product.id === productId ? { ...product, isHovered: !product.isHovered } : product
    );
    setProductsState(updatedProducts);
  };

  return (
    <section className="section_product">
      <div className="container">
        <h2 className="title_blog">
          <a href="" title="Sản phẩm mới">
            Sản phẩm <strong>mới</strong>
          </a>
        </h2>
        <div className="product_block">
          <Slider {...settings}>
            {productsState.map((item) => (
              <div
                className="product_card"
                key={item.id}
                onMouseEnter={() => handleProductCardHover(item.id)}
                onMouseLeave={() => handleProductCardHover(item.id)}
              >
                <a href="" className="product_url"></a>
                <span className="sale_box">-24%</span>
                <div className="product_card-inner">
                  <div className="product_card-image">
                    <img
                      className={`product_card-image-front ${!item.isHovered ? "show" : "hide"}`}
                      src={item.image1}
                      alt=""
                    />
                    <img
                      className={`product_card-image-back ${item.isHovered ? "show" : "hide"}`}
                      src={item.image2}
                      alt=""
                    />
                  </div>
                  <h4 className="product_card-type">{item.type}</h4>
                  <h3 className="product_card-title">{item.title}</h3>
                  <div className="product_card-price">
                    <strong>399.000</strong>
                    <span>525.000</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

SectionProduct.propTypes = {
  products: Proptypes.array.isRequired,
};

export default SectionProduct;
