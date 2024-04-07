import { FaCheck } from 'react-icons/fa';
import './AsideItem.scss';

const AsideItem = ({ data }) => {
  const { title, choices } = data;

  const handleToogleFilter = (e) => {};

  return (
    <aside className='aside-item'>
      <div className='aside-title'>{title}</div>
      <div className='aside-content filter-group'>
        <ul className='filter-type'>
          {choices.map((choice, index) => (
            <li key={index} className='filter-item'>
              <label htmlFor={choice.text} className='text-hover-primary'>
                <input
                  type='checkbox'
                  value={choice.value}
                  id={choice.text}
                  onClick={handleToogleFilter}
                />
                <span className='filter-text'>{choice.text}</span>
                <span className='custom-input'>
                  <FaCheck />
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AsideItem;
