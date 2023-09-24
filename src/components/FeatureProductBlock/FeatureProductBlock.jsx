import Slider from 'react-slick';
import Star from '../../assets/imgs/star.webp';
import ProductCard from '../ProductCard/ProductCard';
import './FeatureProductBlock.scss';
import { products } from '../../../data';

const FeatureProductBlock = () => {
  const data = products[0];
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className='feature-product_block'>
      <div className='container'>
        <h2 className='product_title'>
          <a href=''>
            Bộ sưu tập <strong>Keycap sa osiris</strong>
          </a>
        </h2>
        <Slider {...settings}>
          <div className='shop-the-look'>
            <img src={Star} alt='' />
            <div className='shop-the-look-product'>
              <ProductCard product={data}></ProductCard>
            </div>
          </div>
          <div className='shop-the-look'>
            <img src={Star} alt='' />
            <div className='shop-the-look-product'>
              <ProductCard product={data}></ProductCard>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default FeatureProductBlock;
