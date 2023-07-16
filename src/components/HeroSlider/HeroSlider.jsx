// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroSlider.scss";

import Img1 from "../../assets/imgs/slider_1.jpg";
import Img2 from "../../assets/imgs/slider_2.jpg";
import Img3 from "../../assets/imgs/slider_3.jpg";

const sliderData = [
  {
    id: 1,
    image: Img1,
  },
  {
    id: 2,
    image: Img2,
  },
  {
    id: 3,
    image: Img3,
  },
];
const HeroSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <section className="hero_slider">
      <Slider {...settings}>
        {sliderData.map((item) => (
          <div key={item.id} className="hero_slider-items">
            <img src={item.image} alt="" className="hero_slider-img" />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;
