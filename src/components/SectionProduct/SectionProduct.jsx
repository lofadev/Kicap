import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Button from '../Button/Button';
import ProductCard from '../ProductCard/ProductCard';
import './SectionProduct.scss';

const SectionProduct = ({
  products,
  title,
  strongTitle,
  dots = false,
  arrows = false,
  max = 10,
}) => {
  let dragging = false;
  const settings = {
    arrows: arrows,
    dots: dots,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    beforeChange: () => (dragging = true),
    afterChange: () => (dragging = false),
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const maxLen = parseInt(max);
  const txtButton = title && strongTitle ? `Xem tất cả . ${title} ${strongTitle}` : 'Xem tất cả';

  return (
    <section className='section_product'>
      <div className='container'>
        <h2 className='product_title'>
          <Link to='/' className='text-hover-primary'>
            {title} <strong>{strongTitle}</strong>
          </Link>
        </h2>
        <div className='product_block'>
          <Slider {...settings}>
            {products.map((item, index) => {
              if (index < maxLen) {
                return (
                  <ProductCard
                    onClick={(e) => dragging && e.preventDefault()}
                    key={item.id}
                    product={item}
                  ></ProductCard>
                );
              }
            })}
          </Slider>
        </div>

        <Button type='a' primary className='btn-more'>
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
  max: Proptypes.string,
};

export default SectionProduct;
