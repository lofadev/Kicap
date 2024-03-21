import { FaSearch } from 'react-icons/fa';
import './FormSearch.scss';

const FormSearch = ({ placeholder, value, handleOnChange, handleSearch, disabled }) => {
  return (
    <div className='admin-form-search'>
      <input type='text' placeholder={placeholder} value={value} onChange={handleOnChange} />
      <button onClick={handleSearch} disabled={disabled}>
        <FaSearch /> Tìm kiếm
      </button>
    </div>
  );
};

export default FormSearch;
