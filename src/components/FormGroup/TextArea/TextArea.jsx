import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import '../FormGroup.scss';

const TextArea = ({
  labelName,
  placeholder = labelName,
  required = false,
  name = '',
  formik,
  password,
}) => {
  const [isShow, setIsShow] = useState(password);
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
      <textarea
        id={name}
        type={isShow ? 'password' : 'text'}
        name={name}
        placeholder={placeholder}
        className={`form-control ${hasError ? 'border-red' : ''}`}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
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

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  password: PropTypes.bool,
};

export default TextArea;
