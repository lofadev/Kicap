import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaCartArrowDown, FaHeart, FaRegStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import unidecode from 'unidecode';
import { products } from '~/../data';
import ImgService1 from '~/assets/imgs/policy_images_2.svg';
import ImgService2 from '~/assets/imgs/policy_images_3.svg';
import ImgService3 from '~/assets/imgs/policy_images_4.svg';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import SectionProduct from '~/components/SectionProduct/SectionProduct';
import SwatchSelect from '~/components/SwatchSelect/SwatchSelect';
import './ProductDetails.scss';

const ProductDetails = () => {
  const { title } = useParams();
  const handleFillterProduct = useCallback(() => {
    return products.find((product) => {
      const productTitleParams = unidecode(product.title.toLowerCase())
        .split(' ')
        .map((word) => word.replace(/[^\w\s-]/g, ''))
        .filter((word) => word !== '-')
        .join('-');
      return productTitleParams === title;
    });
  }, [title]);
  const [productState, setProductState] = useState(handleFillterProduct());

  const handleFillterRelatedProduct = useCallback(() => {
    return products.filter(
      (product) => product.type === productState.type && product.id !== productState.id
    );
  }, [productState]);
  const [relatedProduct, setRelatedProduct] = useState(handleFillterRelatedProduct());

  const [slider1, setSlider1] = useState();
  const [slider2, setSlider2] = useState();

  const [skuState, setSkuState] = useState(productState.sku[0] || '(Đang cập nhật...)');
  const handleCalculatorPrice = useCallback(
    (index) => {
      return (
        productState.price[index] - (productState.price[index] * productState.discount[index]) / 100
      );
    },
    [productState]
  );
  const [specialPrice, setSpecialPrice] = useState(handleCalculatorPrice(0));
  const [oldPrice, setOldPrice] = useState(productState.price[0]);
  const [discount, setDiscount] = useState(productState.discount[0]);
  const [status, setStatus] = useState(productState.status[0]);
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncreaseQuantity = () => setQuantity(quantity + 1);
  const handleOnChangeQuantity = (event) => {
    let value = event.target.value;
    if (value != '') value = parseInt(value);
    setQuantity(value);
  };

  const fomattedOldPrice = useMemo(
    () => oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ',
    [oldPrice]
  );
  const roundedSpecialPrice = useMemo(() => Math.round(specialPrice / 1000) * 1000, [specialPrice]);
  const formattedSpecialPrice = useMemo(
    () => roundedSpecialPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ',
    [roundedSpecialPrice]
  );
  const savePrice = useMemo(() => oldPrice - roundedSpecialPrice, [roundedSpecialPrice, oldPrice]);
  const fomattedSavePrice = useMemo(
    () => savePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ',
    [savePrice]
  );

  useEffect(() => {
    document.title = productState.title + ' | Kicap';
    const newProduct = handleFillterProduct();
    setProductState(newProduct);
    setRelatedProduct(handleFillterRelatedProduct());
    setSkuState(productState.sku[0] || '(Đang cập nhật...)');
    setSpecialPrice(handleCalculatorPrice(0));
    setOldPrice(productState.price[0]);
    setDiscount(productState.discount[0]);
    setStatus(productState.status[0]);
  }, [
    title,
    productState,
    handleFillterProduct,
    handleFillterRelatedProduct,
    handleCalculatorPrice,
  ]);

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

  return (
    <>
      <SectionBreadCrumb parent={productState.type} child={productState.title}></SectionBreadCrumb>
      <section className='product'>
        <div className='container'>
          <div className='product-details'>
            <div className='product-main'>
              <div className='product-image-block w-half'>
                <div className='product-image-big'>
                  <Slider {...settings1}>
                    {productState.images.map((img, index) => {
                      return (
                        <div key={index}>
                          <img loading='lazy' src={img} alt='' />
                        </div>
                      );
                    })}
                  </Slider>
                </div>

                <div className='product-image-select'>
                  <Slider {...settings2}>
                    {productState.images.map((img, index) => {
                      return <img loading='lazy' key={index} src={img} alt='' />;
                    })}
                  </Slider>
                </div>
              </div>
              <div className='product-details-pro w-half'>
                <div className='product-top'>
                  <h1 className='title-head'>{productState.title}</h1>
                  <div className='product-sku'>
                    SKU: <span className='variant-sku'>{skuState}</span>
                  </div>
                  <div className='product-vendor'>
                    Thương hiệu: <span className='vendor'>{productState.brand}</span>
                  </div>

                  <div className='product-reviews'>
                    <div className='product-stars'>
                      {Array(5)
                        .fill(0)
                        .map((item, index) => (
                          <FaRegStar key={index} className='product-star' />
                        ))}
                    </div>
                    <a href='#' className='product-reviews-scroll'>
                      Viết đánh giá của bạn
                    </a>
                  </div>

                  <div className='price-box'>
                    <span className='special-price'>{formattedSpecialPrice}</span>
                    {discount > 0 && (
                      <span className='old-price'>
                        Giá thị trường: <del className='product-price-old'>{fomattedOldPrice}</del>
                      </span>
                    )}
                  </div>

                  {discount > 0 && (
                    <span className='save-price'>
                      Tiết kiệm: <span className='product-price-save'>{fomattedSavePrice}</span>
                    </span>
                  )}

                  <div className='inventory_quantity'>
                    <span className='stock-brand-title'>Tình trạng: </span>
                    <span className='a-stock'>
                      {status === 0
                        ? 'Hết hàng'
                        : status > 0
                        ? `${status} sản phẩm có sẵn`
                        : 'Hàng order'}
                    </span>
                  </div>

                  <div className='form-product'>
                    <div id='add-to-cart-form'>
                      {/* chọn mẫu */}
                      <div className='select-swatch'>
                        {productState.layout && (
                          <SwatchSelect product={productState} field='layout'></SwatchSelect>
                        )}
                        {productState.species && (
                          <SwatchSelect product={productState} field='species'></SwatchSelect>
                        )}
                        {productState.color && (
                          <SwatchSelect product={productState} field='color'></SwatchSelect>
                        )}
                        {productState.switch && (
                          <SwatchSelect product={productState} field='switch'></SwatchSelect>
                        )}
                      </div>
                      <div className='form-group'>
                        {/* số lượng */}
                        {status !== 0 && (
                          <div className='custom-btn-number'>
                            <label htmlFor='quantity'>Số lượng:</label>
                            <div className='form-control'>
                              <button className='btn-cts' onClick={handleDecreaseQuantity}>
                                -
                              </button>
                              <input
                                value={quantity}
                                id='quantity'
                                type='text'
                                onChange={handleOnChangeQuantity}
                              />
                              <button className='btn-cts' onClick={handleIncreaseQuantity}>
                                +
                              </button>
                            </div>
                          </div>
                        )}

                        {/* hết hàng */}
                        {status === 0 && (
                          <div className='btn-buy'>
                            <button className='btn-cart disabled'>
                              <span className='txt-main'>
                                <FaCartArrowDown></FaCartArrowDown> Hết hàng
                              </span>
                              <span className='txt-add'>Nhắn tin cho Kicap để đặt hàng trước</span>
                            </button>
                          </div>
                        )}

                        {/* còn hàng */}
                        {(status === null || status > 0) && (
                          <div className='btn-buy'>
                            <button className='btn-cart add_to_cart'>
                              <span className='txt-main'>
                                Mua ngay với giá {formattedSpecialPrice}
                              </span>
                              <span className='txt-add'>Giao hỏa tốc nội thành Hà Nội</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <a href='#' className='i-wish-add'>
                        <span className='i-wish-add-child'>
                          <FaHeart />
                        </span>
                        <span className='i-wish-add-child'>Thêm vào yêu thích</span>
                      </a>

                      <div className='hotline-product'>
                        Gọi đặt mua{' '}
                        <a href='tel:0369161095' title='0369161095'>
                          0369161095
                        </a>
                        <span> (miễn phí 8:30 - 21:30).</span>
                      </div>

                      <div className='module_service_details'>
                        <div className='item_service'>
                          <img src={ImgService1} alt='ImgService1' />
                          <h4>
                            <strong>FREESHIP</strong> với đơn hàng <strong>từ 800.000đ</strong>
                          </h4>
                        </div>
                        <div className='item_service'>
                          <img src={ImgService2} alt='ImgService2' />
                          <h4>
                            Bảo hành <strong>1 năm</strong> tùy sản phẩm
                          </h4>
                        </div>
                        <div className='item_service'>
                          <img src={ImgService3} alt='ImgService3' />
                          <h4>
                            Cam kết <strong>100% chính hãng</strong>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionProduct
          max='4'
          products={relatedProduct}
          title='sản phẩm'
          strongTitle='liên quan'
          navigate={productState.type}
        ></SectionProduct>
      </section>
    </>
  );
};

export default ProductDetails;
