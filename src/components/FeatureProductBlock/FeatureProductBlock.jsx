import { Link } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { products } from '../../../data';
import Star from '../../assets/imgs/star.webp';
import ProductCard from '../ProductCard/ProductCard';
import './FeatureProductBlock.scss';

const FeatureProductBlock = () => {
  const data = products[0];

  return (
    <section className='feature-product_block'>
      <div className='container'>
        <div className='group-product-block'>
          <h2 className='product_title'>
            <Link href=''>
              Bộ sưu tập <strong>Keycap sa osiris</strong>
            </Link>
          </h2>
          <Swiper slidesPerView={1} loop={true}>
            <SwiperSlide>
              <div className='shop-the-look'>
                <div className='shop-the-look-image'>
                  <img src={Star} alt='' />
                </div>
                <div className='shop-the-look-product'>
                  <ProductCard product={data}></ProductCard>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='shop-the-look'>
                <div className='shop-the-look-image'>
                  <img src={Star} alt='' />
                </div>
                <div className='shop-the-look-product'>
                  <ProductCard product={data}></ProductCard>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeatureProductBlock;
