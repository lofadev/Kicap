import PropTypes from 'prop-types';
import { formatPriceToVND } from '~/utils';
import '../FormGroup.scss';

const InputNumber = ({ labelName, required = false, name = '', formik, min, isPrice }) => {
  const { errors, handleChange, handleBlur, values, touched } = formik;
  const error = errors[name];
  const hasError = touched[name] && error;

  return (
    <div className='form-group'>
      {labelName && (
        <label htmlFor={name}>
          {labelName} {required && <span className='required'>*</span>}
        </label>
      )}
      <div className='form-content'>
        <input
          id={name}
          type='number'
          name={name}
          className={`form-control ${hasError ? 'border-red' : ''}`}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete='off'
          min={min}
          onWheel={(e) => e.target.blur()}
        />
        {isPrice && <div className='format-price'>{formatPriceToVND(values[name])}</div>}
      </div>

      {hasError && <span className='form-error'>{error}</span>}
    </div>
  );
};

InputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  required: PropTypes.bool,
};

export default InputNumber;
