import { FaCheck } from 'react-icons/fa';
import './AsideItem.scss';

const AsideItem = ({ data, onClick, choicesArr }) => {
  const { title, choices, field } = data;

  return (
    <aside className='aside-item'>
      <div className='aside-title'>{title}</div>
      <div className='aside-content filter-group'>
        <ul className='filter-type'>
          {choices.map((choice) => {
            const checked = choicesArr.find((c) => c.id === choice.id);
            return (
              <li key={choice.name} className='filter-item'>
                <label htmlFor={choice.name} className='text-hover-primary'>
                  <input
                    type='checkbox'
                    value={choice.value}
                    id={choice.name}
                    data-field={field}
                    data-id={choice.id}
                    // onClick={onClick}
                    checked={!!checked}
                    onChange={onClick}
                  />
                  <span className='filter-text'>{choice.name}</span>
                  <span className='custom-input'>
                    <FaCheck />
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default AsideItem;
