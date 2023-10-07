import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../Button/Button';
import ProductCard from '../ProductCard/ProductCard';
import './SectionProduct.scss';

const SectionProduct = ({ products, title, strongTitle, max, navigate }) => {
  const swiperSettings = {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: max > 4,
    modules: [Navigation],
    breakpoints: {
      991: {
        slidesPerView: 3,
      },
      1150: {
        slidesPerView: 4,
      },
    },
  };

  const maxLen = parseInt(max);
  const txtButton = title && strongTitle ? `Xem tất cả . ${title} ${strongTitle}` : 'Xem tất cả';

  return (
    <section className='section_product'>
      <div className='container'>
        <h2 className='product_title'>
          <Link to={`/${navigate}`} className='text-hover-primary'>
            {title} <strong>{strongTitle}</strong>
          </Link>
        </h2>
        <div className='product_block'>
          <Swiper {...swiperSettings}>
            {products.map((item, index) => {
              if (index < maxLen) {
                return (
                  <SwiperSlide key={item.id}>
                    <ProductCard product={item}></ProductCard>
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
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
  navigate: Proptypes.string.isRequired,
};

export default SectionProduct;
