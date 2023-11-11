import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Img1 from '~/assets/imgs/slider_1.jpg';
import Img2 from '~/assets/imgs/slider_2.jpg';
import Img3 from '~/assets/imgs/slider_3.jpg';
import './HeroSlider.scss';

const sliderData = [
  {
    id: 1,
    image: Img1,
    url: '/product/bo-keycap-p5-persona5',
  },
  {
    id: 2,
    image: Img2,
    url: '/product/bo-keycap-silent-forest',
  },
  {
    id: 3,
    image: Img3,
    url: '/',
  },
];

const HeroSlider = () => {
  const swiperSettings = {
    slidesPerView: 1,
    pagination: true,
    modules: [Pagination],
    loop: true,
  };

  return (
    <section className='hero_slider'>
      <Swiper {...swiperSettings}>
        {sliderData.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Link to={item.url}>
                <div className='hero_slider-items'>
                  <img src={item.image} alt='' className='hero_slider-img' />
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
