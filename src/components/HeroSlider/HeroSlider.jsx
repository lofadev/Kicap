import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderService from '~/services/SliderService';
import './HeroSlider.scss';

const HeroSlider = () => {
  const dispatch = useDispatch();
  const [sliders, setSliders] = useState([]);
  const swiperSettings = {
    slidesPerView: 1,
    pagination: true,
    modules: [Pagination],
    loop: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await SliderService.getSliders({}, dispatch);
      if (res.status === 'OK') {
        setSliders(res.data);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='hero_slider'>
      <Swiper {...swiperSettings}>
        {sliders &&
          sliders.map((item) => {
            return (
              <SwiperSlide key={item._id}>
                <Link to={item.toProduct}>
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
