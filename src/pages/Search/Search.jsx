import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from '~/components/Pagination/Pagination';
import ProductCard from '~/components/ProductCard/ProductCard';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import useQuery from '~/hooks/useQuery';
import ProductService from '~/services/ProductService';
import './Search.scss';

const Search = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(query.page || 1);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Tìm kiếm | Kicap';
    // setQuery({ page });
    const fetchData = async () => {
      const res = await ProductService.getProducts({ ...query, page, limit: 12 }, dispatch);
      if (res.status === 'OK') {
        const products = res.data;
        setProducts(products);
        setTotalPage(res.totalPage);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleClickPage = (value) => {
    setPage(value.selected + 1);
  };

  return (
    <div className='search'>
      <SectionBreadCrumb child={'Kết quả tìm kiếm'} />

      <div className='container' style={{ textAlign: 'center' }}>
        {!products.length ? (
          <>
            <h1 className='search-heading'>KHÔNG TÌM THẤY BẤT KỲ KẾT QUẢ NÀO VỚI TỪ KHÓA TRÊN.</h1>
            <span>Vui lòng nhập từ khoá tìm kiếm khác.</span>
          </>
        ) : (
          <div className='search-products'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product}></ProductCard>
            ))}
          </div>
        )}

        <Pagination
          pageCount={totalPage}
          onClickPageItem={handleClickPage}
          currentPage={page}
        ></Pagination>
      </div>
    </div>
  );
};

export default Search;
