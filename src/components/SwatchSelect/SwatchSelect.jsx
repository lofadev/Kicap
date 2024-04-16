import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import SwatchCheck from '~/assets/imgs/select-pro.jpg';
import './SwatchSelect.scss';

const SwatchSelect = ({ variant, handleGetVariant }) => {
  // const [checked, setChecked] = useState(variant.values[0]);

  const [checked, setChecked] = useState(variant.values[0].id);

  useEffect(() => {
    handleGetVariant({ name: variant.name, id: checked });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleChangeVariant = (id) => {
    setChecked(id);
  };

  return (
    <div className='select-swatch-items'>
      <span className='field-name'>{variant.name}:</span>
      <div className='select-swap'>
        {variant.values.map((item) => {
          const labelName = item.value.toLowerCase().split(' ').join('-');
          return (
            <div key={item.id} className='swatch-element'>
              <input
                type='radio'
                // name={`option-${field}`}
                id={`swatch-${labelName}`}
                checked={item.id === checked}
                onChange={() => handleChangeVariant(item.id)}
              />
              <label htmlFor={`swatch-${labelName}`} className='has-thumb'>
                <span className='label-name'>{item.value}</span>
                <img src={SwatchCheck} alt='' />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

SwatchSelect.propTypes = {
  variant: PropTypes.object.isRequired,
};

export default SwatchSelect;
