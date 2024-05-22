import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { filters } from '~/../data';
import CategoryService from '~/services/CategoryService';
import ProductService from '~/services/ProductService';
import AsideItem from '../AsideItem/AsideItem';
import './AsideFilter.scss';
import useQuery from '~/hooks/useQuery';
import useSetQuery from '~/hooks/useSetQuery';

const AsideFilter = () => {
  const dispatch = useDispatch();
  const [filterMenu, setFilterMenu] = useState(filters);
  const [choices, setChoices] = useState([]);
  const query = useQuery();
  const setQuery = useSetQuery();

  const handleToggleChoice = (e) => {
    const name = e.target.id;
    const id = e.target.dataset.id;
    const field = e.target.dataset.field;
    const value = e.target.value;
    const hasId = choices.find((choice) => choice.id === id);
    if (!hasId) {
      setChoices([...choices, { id, field, value, name }]);
    } else {
      const newChoices = choices.filter((choice) => choice.id !== id);
      setChoices(newChoices);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [resBrand, resCategory] = await Promise.all([
        ProductService.getBrands(dispatch),
        CategoryService.getCategorys({}, dispatch),
      ]);
      if (resBrand.status === 'OK' && resCategory.status === 'OK') {
        const newFilterMenu = filterMenu.map((item) => {
          if (item.field === 'brand') {
            return {
              ...item,
              choices: resBrand.data.map((brand) => {
                const id = uuid();
                return {
                  id,
                  name: brand,
                  value: brand,
                };
              }),
            };
          }
          if (item.field === 'category') {
            return {
              ...item,
              choices: resCategory.data.map((ct) => {
                const id = uuid();
                return {
                  id,
                  name: ct.categoryName,
                  value: ct.categoryName,
                };
              }),
            };
          }
          return {
            ...item,
            choices: item.choices.map((choice) => {
              const id = uuid();
              return {
                ...choice,
                id,
              };
            }),
          };
        });
        setFilterMenu(newFilterMenu);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const queryParams = {};

    choices.forEach((choice) => {
      queryParams[choice.field] = choice.value;
    });
    setQuery(queryParams);
  }, [choices]);

  const handleRemoveChoice = (id) => {
    const newChoice = choices.filter((choice) => choice.id !== id);
    setChoices(newChoice);
  };

  return (
    <div className='aside-filter'>
      <div className='heading'>tìm theo</div>
      <div className='your-choose'>
        <div className='your-choose-head'>
          <span>Bạn chọn</span>
          <span>Bỏ hết</span>
        </div>

        <div className='your-choose-main'>
          {choices.map((choice) => {
            return (
              <div className='choice' key={choice.id} onClick={() => handleRemoveChoice(choice.id)}>
                <FaTimes /> {choice.name}
              </div>
            );
          })}
        </div>
      </div>
      {filterMenu.map((item) => (
        <AsideItem key={item.id} data={item} onClick={handleToggleChoice} choicesArr={choices} />
      ))}
    </div>
  );
};

export default AsideFilter;
