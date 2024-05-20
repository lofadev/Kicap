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
import useSetQuery from '~/hooks/useSetQuery';
import useQuery from '~/hooks/useQuery';

const ProductCategory = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const setQuery = useSetQuery();
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(query.page || 1);
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
    setQuery({ page });
    const fetchData = async (payload) => {
      const res = await ProductService.getProducts(payload, dispatch);
      if (res.status === 'OK') {
        const products = res.data;
        setProducts(products);
        setPageCount(Math.ceil(res.totalProducts / 12));
      }
    };
    fetchData(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className='product-category'>
      <EvoBlogHeader
        title='TẤT CẢ SẢN PHẨM'
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
                pageCount={pageCount}
                onClickPageItem={doSearch}
                currentPage={page}
              ></Pagination>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
