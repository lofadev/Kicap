import { useEffect, useState } from 'react';
import useQuery from '~/hooks/useQuery';
import useSetQuery from '~/hooks/useSetQuery';
import './SortCate.scss';

const sorts = [
  {
    id: 1,
    name: 'Hàng mới',
    value: 'created_on:desc',
  },
  {
    id: 2,
    name: 'Tên A-Z',
    value: 'alpha:asc',
  },
  {
    id: 3,
    name: 'Tên Z-A',
    value: 'alpha:desc',
  },
  {
    id: 4,
    name: 'Giá thấp đến cao',
    value: 'price:asc',
  },
  {
    id: 5,
    name: 'Giá cao đến thấp',
    value: 'price:desc',
  },
];
const SortCate = () => {
  const query = useQuery();
  const setQuery = useSetQuery();
  const [sort, setSort] = useState(query.sortBy || 'created_on:desc');

  useEffect(() => {
    if (sort) setQuery({ ...query, sortBy: sort, page: 1, limit: 12 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <div className='sort-cate'>
      <h3>Xếp theo:</h3>
      <ul className='sort-menu'>
        {sorts.map((s) => {
          return (
            <li
              className={`sort-item ${sort === s.value ? 'active' : ''}`}
              key={s.id}
              title={s.name}
              onClick={() => setSort(s.value)}
            >
              <i></i>
              {s.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SortCate;
