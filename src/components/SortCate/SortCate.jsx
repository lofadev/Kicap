import { useEffect, useState } from 'react';
import './SortCate.scss';
import { products } from '../../../data';
import ProductCard from '../ProductCard/ProductCard';

const sorts = [
  {
    id: 1,
    name: 'Tên A-Z',
    class: 'alpha:asc',
  },
  {
    id: 2,
    name: 'Tên Z-A',
    class: 'alpha:desc',
  },
  {
    id: 3,
    name: 'Hàng mới',
    class: 'created_on:desc',
  },
  {
    id: 4,
    name: 'Giá thấp đến cao',
    class: 'price:asc',
  },
  {
    id: 5,
    name: 'Giá cao đến thấp',
    class: 'price:asc',
  },
];
const SortCate = () => {
  const [sortItemActive, setSortItemActive] = useState(null);
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const temp = [];
    products.forEach((product, index) => {
      if (index < 12) {
        temp.push(product);
      }
    });
    setListProducts(temp);
  }, []);
  return (
    <div className='sort-cate'>
      <h3>Xếp theo:</h3>
      <ul className='sort-menu'>
        {sorts.map((sort) => {
          return (
            <li
              className={`sort-item ${sortItemActive === sort.id ? 'active' : ''}`}
              key={sort.id}
              title={sort.name}
              onClick={() => setSortItemActive(sort.id)}
            >
              <i></i>
              {sort.name}
            </li>
          );
        })}
      </ul>

      <div className='products-view'>
        {listProducts.map((product) => {
          return <ProductCard key={product.id} product={product}></ProductCard>;
        })}
      </div>
    </div>
  );
};

export default SortCate;
