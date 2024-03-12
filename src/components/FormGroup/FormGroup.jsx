import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import './FormGroup.scss';

const FormGroup = ({
  type,
  password,
  labelName,
  required = false,
  placeholder = labelName,
  name = '',
  labelFor,
  autoFocus = false,
  valueInput,
  handleOnChange,
  error = false,
  eye,
}) => {
  const Element = type == 'text' ? 'textarea' : 'input';
  const [isShow, setIsShow] = useState(password);

  return (
    <div className='form-group'>
      <label htmlFor={labelFor}>
        {labelName} {required && <span className='required'>*</span>}
      </label>
      <Element
        id={labelFor}
        type={isShow ? 'password' : 'text'}
        name={name}
        placeholder={placeholder}
        className={`form-control ${error ? 'border-red' : ''}`}
        autoFocus={autoFocus}
        value={valueInput}
        onChange={handleOnChange}
        autoComplete='off'
      />
      {eye && (
        <div className='form-eye' onClick={() => setIsShow((prev) => !prev)}>
          {isShow && <FaEyeSlash />}
          {!isShow && <FaEye />}
        </div>
      )}
      {error && <span className='form-error'>{error}</span>}
    </div>
  );
};

FormGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  typeInput: PropTypes.string,
  labelName: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  labelFor: PropTypes.string.isRequired,
};

export default FormGroup;
