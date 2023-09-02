import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import unidecode from "unidecode";
import { products } from "../../../data";
import SectionBreadCrumb from "../../components/SectionBreadCrumb/SectionBreadCrumb";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const { title } = useParams();
  const [productState] = useState(() => {
    return products.find((product) => {
      const productTitleParams = unidecode(product.title.toLowerCase()).split(" ").join("-");
      return productTitleParams === title;
    });
  });
  const [slider1, setSlider1] = useState();
  const [slider2, setSlider2] = useState();

  const settings1 = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: slider2,
    ref: (Slider1) => setSlider1(Slider1),
  };

  const settings2 = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: slider1,
    ref: (Slider2) => setSlider2(Slider2),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <>
      <SectionBreadCrumb></SectionBreadCrumb>
      <section className="product">
        <div className="container">
          <div className="product-details">
            <div className="product-main">
              <div className="product-image-block w-half">
                <div className="product-image-big">
                  <Slider {...settings1}>
                    {productState.images.map((img, index) => {
                      return (
                        <div key={index}>
                          <img src={img} alt="" />
                        </div>
                      );
                    })}
                  </Slider>
                </div>

                <div className="product-image-select">
                  <Slider {...settings2}>
                    {productState.images.map((img, index) => {
                      return <img key={index} src={img} alt="" />;
                    })}
                  </Slider>
                </div>
              </div>
              <div className="product-details-pro w-half">
                <div className="product-top">
                  <h1 className="title-head">{productState.title}</h1>
                  <div className="product-sku">
                    SKU: <span className="variant-sku">{productState.sku}</span>
                  </div>
                  <div className="product-vendor">
                    Thương hiệu <span className="vendor">{productState.brand}</span>
                  </div>
                  <div className="product-reviews">Đánh giá</div>
                  <div className="price-box">
                    <span className="special-price"></span>
                    <span className="old-price">
                      Giá thị trường: <del className="product-price-old"></del>
                    </span>
                  </div>
                  <span className="save-price">
                    Tiết kiệm: <span className="product-price-save">000</span>
                  </span>

                  <div className="inventory_quantity">
                    <span className="stock-brand-title">Tình trạng: </span>
                    <span className="a-stock"></span>
                  </div>

                  <div className="form-product">
                    <form action="" id="add-to-cart-form">
                      <div className="form-group">
                        <div className="custom-btn-number">
                          <label htmlFor="">Số lượng:</label>
                          <div className="form-control">
                            <button>-</button>
                            <input type="text" />
                            <button>+</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
