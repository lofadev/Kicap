import { useState } from 'react';
import './SortCate.scss';

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
    </div>
  );
};

export default SortCate;
