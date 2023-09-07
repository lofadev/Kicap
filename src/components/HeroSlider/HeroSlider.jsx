// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./HeroSlider.scss";

import { Link } from "react-router-dom";
import Img1 from "../../assets/imgs/slider_1.jpg";
import Img2 from "../../assets/imgs/slider_2.jpg";
import Img3 from "../../assets/imgs/slider_3.jpg";

const sliderData = [
  {
    id: 1,
    image: Img1,
    url: "/product/bo-keycap-p5-persona5",
  },
  {
    id: 2,
    image: Img2,
    url: "/product/bo-keycap-silent-forest",
  },
  {
    id: 3,
    image: Img3,
    url: "/",
  },
];

const HeroSlider = () => {
  let dragging = false;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: true,
    beforeChange: () => (dragging = true),
    afterChange: () => (dragging = false),
  };

  return (
    <section className="hero_slider">
      <Slider {...settings}>
        {sliderData.map((item) => (
          <Link key={item.id} to={item.url} onClick={(e) => dragging && e.preventDefault()}>
            <div className="hero_slider-items">
              <img src={item.image} alt="" className="hero_slider-img" />
            </div>
          </Link>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;
