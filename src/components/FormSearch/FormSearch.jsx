import Proptypes from 'prop-types';
import { FaXmark } from 'react-icons/fa6';
import Search from '../../assets/imgs/search.svg';
import './FormSearch.scss';
import { useEffect, useState } from 'react';

const FormSearch = ({ onClick: handleToggleInSearch, searchActive }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue('');
  }, [searchActive]);

  return (
    <div className={`form-search ${searchActive ? 'active' : ''}`}>
      <form action='/search'>
        <div className='input-group'>
          <input
            type='text'
            name='query'
            className='form-control'
            placeholder='Bạn cần tìm gì hôm nay?'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <span className='input-group-btn'>
            <button className='btn btn-default' type='submit'>
              <img src={Search} alt='' />
            </button>
          </span>
        </div>
      </form>
      <button className='close-search' title='Đóng tìm kiếm' onClick={handleToggleInSearch}>
        <FaXmark />
      </button>
    </div>
  );
};

FormSearch.propTypes = {
  onClick: Proptypes.func.isRequired,
  searchActive: Proptypes.bool,
};

export default FormSearch;
