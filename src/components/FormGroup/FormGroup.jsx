import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import './FormGroup.scss';

const FormGroup = ({
  type = 'input',
  password,
  labelName,
  required = false,
  placeholder = labelName,
  name = '',
  autoFocus = false,
  value,
  handleOnChange,
  error = false,
  eye,
  children,
}) => {
  const Element = type == 'text' ? 'textarea' : 'input';
  const [isShow, setIsShow] = useState(password);

  return (
    <div className='form-group'>
      {labelName && (
        <label htmlFor={name}>
          {labelName} {required && <span className='required'>*</span>}
        </label>
      )}
      {children ?? (
        <Element
          id={name}
          type={isShow ? 'password' : 'text'}
          name={name}
          placeholder={placeholder}
          className={`form-control ${error ? 'border-red' : ''}`}
          autoFocus={autoFocus}
          value={value}
          onChange={handleOnChange}
          autoComplete='off'
        />
      )}

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
  name: PropTypes.string.isRequired,
  typeInput: PropTypes.string,
  labelName: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default FormGroup;
