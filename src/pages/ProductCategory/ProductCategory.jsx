import { useEffect, useState } from 'react';
import { products } from '~/../data';
import AsideCategory from '~/components/AsideCategory/AsideCategory';
import AsideFilter from '~/components/AsideFilter/AsideFilter';
import EvoBlogHeader from '~/components/EvoBlogHeader/EvoBlogHeader';
import Pagination from '~/components/Pagination/Pagination';
import ProductCard from '~/components/ProductCard/ProductCard';
import SortCate from '~/components/SortCate/SortCate';
import './ProductCategory.scss';

const ProductCategory = () => {
  const [listProducts, setListProducts] = useState([]);
  const [totalProduct] = useState(() => products.length);
  const [pageCount] = useState(() => Math.ceil(totalProduct / 12));
  const [page, setPage] = useState(1);

  const doSearch = (value) => {
    setPage(value.selected + 1);
  };

  useEffect(() => {
    const temp = [];
    products.forEach((product, index) => {
      if (index >= (page - 1) * 12 && index < page * 12) {
        temp.push(product);
      }
    });
    setListProducts(temp);
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <div className='sidebar'>
              <AsideCategory />
              <AsideFilter />
            </div>
            <div className='product-category-main-container'>
              <SortCate />

              <div className='products-view'>
                {listProducts.map((product) => {
                  return <ProductCard key={product.id} product={product}></ProductCard>;
                })}
              </div>

              <Pagination pageCount={pageCount} onClickPageItem={doSearch}></Pagination>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
