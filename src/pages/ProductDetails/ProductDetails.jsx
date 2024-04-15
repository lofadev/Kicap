import { useEffect, useState } from 'react';
import { FaCartArrowDown, FaHeart, FaRegStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ImgService1 from '~/assets/imgs/policy_images_2.svg';
import ImgService2 from '~/assets/imgs/policy_images_3.svg';
import ImgService3 from '~/assets/imgs/policy_images_4.svg';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import SectionProduct from '~/components/SectionProduct/SectionProduct';
import ProductImageService from '~/services/ProductImageService';
import ProductService from '~/services/ProductService';
import ProductVariantService from '~/services/ProductVariantService';
import ProductDetailsImage from '../ProductDetailsImage/ProductDetailsImage';
import './ProductDetails.scss';
import { formatPriceToVND } from '~/utils';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const productID = location.state.id;
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [salePrice, setSalePridce] = useState(0);
  const [price, setPrice] = useState(0);
  const [savePrice, setSavePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const [product, productImages, productVariants] = await Promise.all([
        ProductService.getProduct(productID, dispatch),
        ProductImageService.getProductImages(productID, dispatch),
        ProductVariantService.getProductVariants(productID, dispatch),
      ]);
      const relatedProduct = await ProductService.getProducts(
        { type: product.data.category },
        dispatch
      );
      if (product.status === 'OK') {
        const data = product.data;
        document.title = product.name + ' | Kicap';
        const price = data.price;
        const salePrice = price - (data.price * data.discount) / 100;
        const savedPrice = price - salePrice;
        setProduct(data);
        setPrice(price);
        setSalePridce(salePrice);
        setSavePrice(savedPrice);
        setDiscount(data.discount);
        setStock(data.stock);
      }
      if (productImages.status === 'OK') setProductImages(productImages.data);
      if (productVariants.status === 'OK') setProductVariants(productVariants.data);
      if (relatedProduct.status === 'OK') setRelatedProduct(relatedProduct.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID]);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncreaseQuantity = () => setQuantity(quantity + 1);
  const handleOnChangeQuantity = (event) => {
    let value = event.target.value;
    if (value) value = parseInt(value);
    setQuantity(value);
  };

  return (
    <>
      {product.name && (
        <SectionBreadCrumb parent={product.category} slug={product.slug} child={product.name} />
      )}
      <section className='product'>
        <div className='container'>
          <div className='product-details'>
            <div className='product-main'>
              {productImages.length && <ProductDetailsImage images={productImages} />}

              <div className='product-details-pro'>
                <div className='product-top'>
                  <h1 className='title-head'>{product.name}</h1>
                  <div className='product-sku'>
                    SKU: <span className='variant-sku'>{product.sku}</span>
                  </div>
                  <div className='product-vendor'>
                    Thương hiệu: <span className='vendor'>{product.brand}</span>
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
                    <span className='special-price'>{formatPriceToVND(salePrice)}</span>
                    {discount > 0 && (
                      <span className='old-price'>
                        Giá thị trường:{' '}
                        <del className='product-price-old'>{formatPriceToVND(price)}</del>
                      </span>
                    )}
                  </div>

                  {discount > 0 && (
                    <span className='save-price'>
                      Tiết kiệm:{' '}
                      <span className='product-price-save'>{formatPriceToVND(savePrice)}</span>
                    </span>
                  )}

                  <div className='inventory_quantity'>
                    <span className='stock-brand-title'>Tình trạng: </span>
                    <span className='a-stock'>
                      {stock === 0
                        ? 'Hết hàng'
                        : stock > 0
                        ? `${stock} sản phẩm có sẵn`
                        : 'Hàng order'}
                    </span>
                  </div>

                  <div className='form-product'>
                    <div id='add-to-cart-form'>
                      {/* chọn mẫu */}
                      <div className='select-swatch'>
                        {/* {productState.layout && (
                          <SwatchSelect product={productState} field='layout' />
                        )}
                        {productState.species && (
                          <SwatchSelect product={productState} field='species' />
                        )}
                        {productState.color && (
                          <SwatchSelect product={productState} field='color' />
                        )}
                        {productState.switch && (
                          <SwatchSelect product={productState} field='switch' />
                        )} */}
                      </div>

                      <div className='form-group'>
                        {/* số lượng */}
                        {stock !== 0 && (
                          <div className='custom-btn-number'>
                            <label htmlFor='quantity'>Số lượng:</label>
                            <div className='form-quantity'>
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
                        {stock === 0 && (
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
                        {(stock === null || stock > 0) && (
                          <div className='btn-buy'>
                            <button className='btn-cart add_to_cart'>
                              <span className='txt-main'>Mua ngay với giá {salePrice}</span>
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

        {product.category && (
          <SectionProduct
            products={relatedProduct}
            title='sản phẩm'
            strongTitle='liên quan'
            navigate={product.slug}
          ></SectionProduct>
        )}
      </section>
    </>
  );
};

export default ProductDetails;
