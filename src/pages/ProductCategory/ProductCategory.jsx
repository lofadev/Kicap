import { useEffect, useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import AsideCategory from '~/components/AsideCategory/AsideCategory';
import AsideFilter from '~/components/AsideFilter/AsideFilter';
import EvoBlogHeader from '~/components/EvoBlogHeader/EvoBlogHeader';
import Pagination from '~/components/Pagination/Pagination';
import ProductCard from '~/components/ProductCard/ProductCard';
import SortCate from '~/components/SortCate/SortCate';
import ProductService from '~/services/ProductService';
import './ProductCategory.scss';

const ProductCategory = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  // const [pageCount] = useState(() => Math.ceil(totalProduct / 12));
  const [page, setPage] = useState(1);
  const [openFilters, setOpenFilters] = useState(false);

  const doSearch = (value) => {
    setPage(value.selected + 1);
  };

  const handleToggleFilters = () => {
    setOpenFilters((prev) => !prev);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const payload = { page, limit: 12 };
    const fetchData = async (payload) => {
      const res = await ProductService.getProducts(payload, dispatch);
      if (res.status === 'OK') {
        const products = res.data;
        setProducts(products);
        setTotalProduct(res.totalProducts);
      }
    };
    fetchData(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className='product-category'>
      <EvoBlogHeader
        title='Mods bàn phím cơ'
        desc='Kicap với đội ngũ mods chuyên nghiệp luôn mong muốn mang đến trải nghiệm mods phím
              tuyệt vời và đúng gu của khách hàng nhất có thể'
        image={
          'https://bizweb.dktcdn.net/100/436/596/collections/53820d484a9f88c1d18e.jpg?v=1658977734810'
        }
        height={360}
        color='white'
      />

      <div className='container'>
        <div className='product-category-main'>
          <section className='product-category-content'>
            <div
              className={`open-filters ${openFilters ? 'open' : ''}`}
              onClick={handleToggleFilters}
            >
              {!openFilters && (
                <div>
                  <FaFilter />
                </div>
              )}
              {openFilters && (
                <div>
                  <FaTimes />
                </div>
              )}
            </div>
            <div className='sidebar'>
              <AsideCategory />
              <AsideFilter />
            </div>

            <div className='product-category-main-container'>
              <SortCate />

              <div className='products-view'>
                {products.map((product) => {
                  return <ProductCard key={product._id} product={product}></ProductCard>;
                })}
              </div>

              <Pagination
                pageCount={Math.ceil(totalProduct / 12)}
                onClickPageItem={doSearch}
              ></Pagination>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
