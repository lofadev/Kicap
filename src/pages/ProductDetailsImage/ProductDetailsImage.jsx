import { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Autoplay, EffectFade, FreeMode, Keyboard, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './ProductDetailsImage.scss';

const ProductDetailsImage = ({ images }) => {
  const swiperRef = useRef();
  const totalImage = images.length;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleViewImage = (e) => {
    swiperRef.current.swiper.autoplay.stop();
    setIsOpen(true);
    const index = parseInt(e.target.dataset.index);
    setPhotoIndex(index);
  };

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
          <img src={images[photoIndex]?.image} alt='' />
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
          {!images.length && <div className='skeleton'></div>}
          <Swiper {...settings1} ref={swiperRef}>
            {images.length > 0 &&
              images.map((img, index) => {
                return (
                  <SwiperSlide key={img._id}>
                    <div onClick={handleViewImage}>
                      <img data-index={index} loading='lazy' src={img.image} alt='' />
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>

        {/* <button onClick={() => swiperRef.current.swiper.slideTo(7, 300)}>hello</button> */}

        <div className='product-image-select'>
          <Swiper {...settings2} className={images.length < 5 ? 'center' : ''}>
            {images.map((img) => {
              return (
                <SwiperSlide key={img._id}>
                  <div>
                    <img loading='lazy' src={img.image} alt='' />
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
