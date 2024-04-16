import { useEffect, useState } from 'react';
import { FaCartArrowDown, FaHeart, FaRegStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ImgService1 from '~/assets/imgs/policy_images_2.svg';
import ImgService2 from '~/assets/imgs/policy_images_3.svg';
import ImgService3 from '~/assets/imgs/policy_images_4.svg';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import SectionProduct from '~/components/SectionProduct/SectionProduct';
import SwatchSelect from '~/components/SwatchSelect/SwatchSelect';
import ProductImageService from '~/services/ProductImageService';
import ProductService from '~/services/ProductService';
import ProductVariantService from '~/services/ProductVariantService';
import { formatPriceToVND } from '~/utils';
import ProductDetailsImage from '../ProductDetailsImage/ProductDetailsImage';
import './ProductDetails.scss';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const productID = location.state.id;
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [variants, setVariants] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const [productRes, productImagesRes, productVariantsRes] = await Promise.all([
        ProductService.getProduct(productID, dispatch),
        ProductImageService.getProductImages(productID, dispatch),
        ProductVariantService.getProductVariants(productID, dispatch),
      ]);
      const relatedProductRes = await ProductService.getProducts(
        { type: productRes.data.category },
        dispatch
      );
      if (productRes.status === 'OK') {
        const product = productRes.data;
        document.title = product.name + ' | Kicap';
        product.title = product.name;
        setProduct(product);
      }
      if (productImagesRes.status === 'OK') setProductImages(productImagesRes.data);
      if (productVariantsRes.status === 'OK') {
        const variants = productVariantsRes.data.reduce((acc, current) => {
          const existingItem = acc.find((item) => item.name === current.name);
          if (existingItem) {
            existingItem.values.push({ id: current._id, value: current.value });
          } else {
            acc.push({ name: current.name, values: [{ id: current._id, value: current.value }] });
          }
          return acc;
        }, []);
        setProductVariants(productVariantsRes.data);
        setVariants(variants);
      }
      if (relatedProductRes.status === 'OK') {
        const newRelatedProduct = relatedProductRes.data.filter(
          (item) => item._id !== productRes.data._id
        );
        setRelatedProduct(newRelatedProduct);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID]);

  const handleGetVariant = (value) => {
    const variant = productVariants.find((variant) => variant._id === value.id);
    setProduct({ ...product, ...variant });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleIncreaseQuantity = () => setQuantity(quantity + 1);
  const handleOnChangeQuantity = (e) => {
    let value = e.target.value;
    if (value) value = parseInt(value);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    console.log(product, quantity);
  };

  return (
    <>
      {product.title && (
        <SectionBreadCrumb parent={product?.category} slug={product?.slug} child={product?.title} />
      )}
      <section className='product'>
        <div className='container'>
          <div className='product-details'>
            <div className='product-main'>
              {productImages.length && <ProductDetailsImage images={productImages} />}

              <div className='product-details-pro'>
                <div className='product-top'>
                  <h1 className='title-head'>{product?.title}</h1>
                  <div className='product-sku'>
                    SKU: <span className='variant-sku'>{product?.sku}</span>
                  </div>
                  <div className='product-vendor'>
                    Thương hiệu: <span className='vendor'>{product?.brand}</span>
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
                    <span className='special-price'>{formatPriceToVND(product?.salePrice)}</span>
                    {product?.discount > 0 && (
                      <span className='old-price'>
                        Giá thị trường:{' '}
                        <del className='product-price-old'>{formatPriceToVND(product?.price)}</del>
                      </span>
                    )}
                  </div>

                  {product?.discount > 0 && (
                    <span className='save-price'>
                      Tiết kiệm:{' '}
                      <span className='product-price-save'>
                        {formatPriceToVND(product?.price - product?.salePrice)}
                      </span>
                    </span>
                  )}

                  <div className='inventory_quantity'>
                    <span className='stock-brand-title'>Tình trạng: </span>
                    <span className='a-stock'>
                      {!product?.stock ? 'Hết hàng' : `${product?.stock} sản phẩm có sẵn`}
                    </span>
                  </div>

                  <div className='form-product'>
                    <div id='add-to-cart-form'>
                      {/* chọn mẫu */}
                      <div className='select-swatch'>
                        {variants &&
                          variants.map((variant, index) => (
                            <SwatchSelect
                              key={index}
                              variant={variant}
                              handleGetVariant={handleGetVariant}
                            />
                          ))}
                      </div>

                      <div className='form-group'>
                        {/* số lượng */}
                        {product.stock !== 0 && (
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
                        {!product?.stock ? (
                          <div className='btn-buy'>
                            <button className='btn-cart disabled'>
                              <span className='txt-main'>
                                <FaCartArrowDown></FaCartArrowDown> Hết hàng
                              </span>
                            </button>
                          </div>
                        ) : (
                          <div className='btn-buy'>
                            <button className='btn-cart add_to_cart' onClick={handleAddToCart}>
                              <span className='txt-main'>Thêm vào giỏ hàng</span>
                              <span className='txt-add'>Giao hàng toàn quốc</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <Link to='' className='i-wish-add'>
                        <span className='i-wish-add-child'>
                          <FaHeart />
                        </span>
                        <span className='i-wish-add-child'>Thêm vào yêu thích</span>
                      </Link>

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
