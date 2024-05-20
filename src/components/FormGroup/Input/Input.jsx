import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import '../FormGroup.scss';

const Input = ({
  labelName,
  placeholder = labelName,
  required = false,
  name = '',
  formik,
  password,
  textarea,
}) => {
  const [isShow, setIsShow] = useState(password);
  const { errors, handleChange, handleBlur, values, touched } = formik;
  const error = errors[name];
  const hasError = touched[name] && error;
  const Element = textarea ? 'textarea' : 'input';

  return (
    <div className='form-group'>
      {labelName && (
        <label htmlFor={name}>
          {labelName} {required && <span className='required'>*</span>}
        </label>
      )}
      <Element
        id={name}
        type={isShow ? 'password' : 'text'}
        name={name}
        placeholder={placeholder}
        className={`form-control ${hasError ? 'border-red' : ''}`}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete='off'
      />

      {password && (
        <div className='form-eye' onClick={() => setIsShow((prev) => !prev)}>
          {isShow && <FaEyeSlash />}
          {!isShow && <FaEye />}
        </div>
      )}
      {hasError && <span className='form-error'>{error}</span>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  labelName: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  password: PropTypes.bool,
};

export default Input;
