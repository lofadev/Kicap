import { useEffect, useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import AsideCategory from '~/components/AsideCategory/AsideCategory';
import AsideFilter from '~/components/AsideFilter/AsideFilter';
import EvoBlogHeader from '~/components/EvoBlogHeader/EvoBlogHeader';
import Pagination from '~/components/Pagination/Pagination';
import ProductCard from '~/components/ProductCard/ProductCard';
import SortCate from '~/components/SortCate/SortCate';
import useQuery from '~/hooks/useQuery';
import useSetQuery from '~/hooks/useSetQuery';
import ProductService from '~/services/ProductService';
import './ProductCategory.scss';

const ProductCategory = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const setQuery = useSetQuery();
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [page, setPage] = useState(query.page ?? 1);
  const [openFilters, setOpenFilters] = useState(false);

  const doSearch = (value) => {
    setPage(value.selected + 1);
  };

  const handleToggleFilters = () => {
    setOpenFilters((prev) => !prev);
  };

  const fetchData = async (params) => {
    const res = await ProductService.getProductsFilter(params, dispatch);
    if (res.status === 'OK') {
      const products = res.data;
      setProducts(products);
      setPageCount(res.totalPage);
      setTotalProduct(res.totalProducts);
    }
  };

  useEffect(() => {
    setQuery({ limit: 12, ...query, page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchData(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div className='product-category'>
      <EvoBlogHeader
        title='SẢN PHẨM'
        desc='Khám phá thế giới keycap và phụ kiện bàn phím đa dạng nhưng cũng đầy chất lượng!'
        image={
          'https://bizweb.dktcdn.net/100/436/596/themes/834446/assets/evo-col-banner.jpg?1709705396374'
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
              <AsideFilter page={page} />
            </div>

            <div className='product-category-main-container'>
              <SortCate />

              <div className='products-view'>
                {products.map((product) => {
                  return <ProductCard key={product._id} product={product}></ProductCard>;
                })}
              </div>

              {totalProduct > (query.limit || 12) && (
                <Pagination
                  pageCount={pageCount}
                  onClickPageItem={doSearch}
                  currentPage={query.page}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
