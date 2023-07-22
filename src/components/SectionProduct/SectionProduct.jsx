import Proptypes from "prop-types";
import Slider from "react-slick";
import "./SectionProduct.scss";
import Button from "../Button/Button";
import ProductCard from "../ProductCard/ProductCard";

const SectionProduct = ({ products, title, strongTitle, txtButton, dots = false, arrows = false }) => {
  const settings = {
    arrows: arrows,
    dots: dots,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 8,
  };

  return (
    <section className="section_product">
      <div className="container">
        <h2 className="title_blog">
          <a href="">
            {title} <strong>{strongTitle}</strong>
          </a>
        </h2>
        <div className="product_block">
          <Slider {...settings}>
            {products.map((item) => (
              <ProductCard key={item.id} data={item}></ProductCard>
            ))}
          </Slider>
        </div>

        <Button type="a" primary className="btn-more">
          {txtButton}
        </Button>
      </div>
    </section>
  );
};

SectionProduct.propTypes = {
  products: Proptypes.array.isRequired,
  title: Proptypes.string,
  strongTitle: Proptypes.string,
  txtButton: Proptypes.node,
  dots: Proptypes.bool,
  arrows: Proptypes.bool,
};

export default SectionProduct;
