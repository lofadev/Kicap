import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Autoplay, EffectFade, FreeMode, Keyboard, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './ProductDetailsImage.scss';

const ProductDetailsImage = ({ productState }) => {
  const swiperRef = useRef();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [totalImage, setTotalImage] = useState(() => productState.images.length);

  const handleViewImage = (e) => {
    swiperRef.current.swiper.autoplay.stop();
    setIsOpen(true);
    const index = parseInt(e.target.dataset.index);
    setPhotoIndex(index);
  };

  useEffect(() => {
    setTotalImage(productState.images.length);
  }, [productState]);

  const handlePrevImg = () => {
    if (photoIndex > 0) {
      setPhotoIndex((prev) => prev - 1);
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextImg = () => {
    if (photoIndex < totalImage - 1) {
      swiperRef.current.swiper.slideNext();
      setPhotoIndex((prev) => prev + 1);
    }
  };
  const settings1 = {
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
    },
    effect: 'fade',
    navigation: true,
    modules: [EffectFade, Thumbs, Autoplay, Navigation],
    thumbs: { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null },
  };

  const settings2 = {
    spaceBetween: 5,
    slidesPerView: 4,
    freeMode: true,
    modules: [Thumbs, Keyboard, FreeMode],
    onSwiper: setThumbsSwiper,
    breakpoints: {
      1199: {
        slidesPerView: 5,
      },
    },
  };
  return (
    <>
      <div className={`modal-show-image ${isOpen ? 'active' : ''}`}>
        <div className='modal-overlay' onClick={() => setIsOpen(false)} />
        <div className='btn-close-modal' onClick={() => setIsOpen(false)}>
          <AiOutlineClose />
        </div>
        <div className='modal-image'>
          <img src={productState.images[photoIndex]} alt='' />
        </div>

        <button className={`btn-prev ${photoIndex == 0 ? 'disabled' : ''}`} onClick={handlePrevImg}>
          <MdNavigateBefore />
        </button>
        <button
          className={`btn-next ${photoIndex == totalImage - 1 ? 'disabled' : ''}`}
          onClick={handleNextImg}
        >
          <MdNavigateNext />
        </button>
      </div>
      <div className='product-image-block'>
        <div className='product-image-big'>
          <Swiper {...settings1} ref={swiperRef}>
            {productState.images.map((img, index) => {
              return (
                <SwiperSlide key={index}>
                  <div onClickCapture={handleViewImage}>
                    <img data-index={index} loading='lazy' src={img} alt='' />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className='product-image-select'>
          <Swiper {...settings2} className={totalImage < 4 ? 'center' : ''}>
            {productState.images.map((img, index) => {
              return (
                <SwiperSlide key={index}>
                  <div>
                    <img loading='lazy' src={img} alt='' />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsImage;
