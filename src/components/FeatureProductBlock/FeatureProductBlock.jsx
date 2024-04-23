import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Star from '~/assets/imgs/star.webp';
import ProductService from '~/services/ProductService';
import ProductCard from '../ProductCard/ProductCard';
import './FeatureProductBlock.scss';

const FeatureProductBlock = () => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await ProductService.getProducts({ limit: 1, type: 'Keycap bộ' }, dispatch);
      if (res.status === 'OK') {
        const product = res.data;
        setProduct(product[0]);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='feature-product_block'>
      <div className='container'>
        <div className='group-product-block'>
          <h2 className='product_title'>
            <Link href='' className='text-hover-primary'>
              Bộ sưu tập <strong>Keycap Bộ</strong>
            </Link>
          </h2>
          <Swiper slidesPerView={1} loop={true}>
            <SwiperSlide>
              <div className='shop-the-look'>
                <div className='shop-the-look-image'>
                  <img src={Star} alt='' />
                </div>
                <div className='shop-the-look-product'>
                  <ProductCard product={product}></ProductCard>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='shop-the-look'>
                <div className='shop-the-look-image'>
                  <img src={Star} alt='' />
                </div>
                <div className='shop-the-look-product'>
                  <ProductCard product={product}></ProductCard>
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
