import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { filters } from '~/../data';
import useQuery from '~/hooks/useQuery';
import useSetQuery from '~/hooks/useSetQuery';
import CategoryService from '~/services/CategoryService';
import ProductService from '~/services/ProductService';
import AsideItem from '../AsideItem/AsideItem';
import './AsideFilter.scss';

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
    if (filterMenu[1].choices.length > 0) {
      const currentChoices = [];
      const { category, brand, price, stock } = query;
      if (stock) {
        const choicesStock = filterMenu[0].choices.reduce((acc, choice) => {
          if (stock.includes(choice.value)) {
            const { id, name, value } = choice;
            acc.push({ id, name, value, field: filterMenu[0].field });
          }
          return acc;
        }, []);
        currentChoices.push(...choicesStock);
      }
      if (brand) {
        const choicesBrand = filterMenu[1].choices.reduce((acc, choice) => {
          if (brand.includes(choice.value)) {
            const { id, name, value } = choice;
            acc.push({ id, name, value, field: filterMenu[1].field });
          }
          return acc;
        }, []);
        currentChoices.push(...choicesBrand);
      }
      if (price) {
        const choicesPrice = filterMenu[2].choices.reduce((acc, choice) => {
          if (price.includes(choice.value)) {
            const { id, name, value } = choice;
            acc.push({ id, name, value, field: filterMenu[2].field });
          }
          return acc;
        }, []);
        currentChoices.push(...choicesPrice);
      }
      if (category) {
        const choicesCategory = filterMenu[3].choices.reduce((acc, choice) => {
          if (category.includes(choice.value)) {
            const { id, name, value } = choice;
            acc.push({ id, name, value, field: filterMenu[3].field });
          }
          return acc;
        }, []);
        currentChoices.push(...choicesCategory);
      }
      setChoices(currentChoices);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterMenu, location.search]);

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
    const choiceParamsObject = choices.reduce((acc, choice) => {
      if (choice.field === 'price') {
        if (!acc.price) acc.price = [];
        acc.price.push(choice.value);
      } else if (choice.field === 'brand') {
        if (!acc.brand) acc.brand = [];
        acc.brand.push(choice.value);
      } else if (choice.field === 'category') {
        if (!acc.category) acc.category = [];
        acc.category.push(choice.value);
      } else {
        acc[choice.field] = choice.value;
      }
      return acc;
    }, {});
    setQuery({ ...choiceParamsObject, page: 1, limit: 12, sortBy: query.sortBy });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices]);

  const handleRemoveChoice = (id) => {
    const newChoice = choices.filter((choice) => choice.id !== id);
    setChoices(newChoice);
  };

  return (
    <div className='aside-filter'>
      <div className='heading'>tìm theo</div>
      {choices.length > 0 && (
        <div className='your-choose'>
          <div className='your-choose-head'>
            <span>Bạn chọn</span>
            <span onClick={() => setChoices([])}>Bỏ hết</span>
          </div>

          <div className='your-choose-main'>
            {choices.map((choice) => {
              return (
                <div
                  className='choice'
                  key={choice.id}
                  onClick={() => handleRemoveChoice(choice.id)}
                >
                  <FaTimes /> {choice.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {filterMenu.map((item) => (
        <AsideItem key={item.id} data={item} onClick={handleToggleChoice} choicesArr={choices} />
      ))}
    </div>
  );
};

export default AsideFilter;
