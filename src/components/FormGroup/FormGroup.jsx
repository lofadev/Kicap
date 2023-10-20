import PropTypes from 'prop-types';
import './FormGroup.scss';

const FormGroup = ({
  type,
  labelName,
  required = false,
  className = '',
  placeholder = labelName,
  labelFor,
}) => {
  const Element = type == 'text' ? 'textarea' : 'input';
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={labelFor}>
        {labelName} {required && <span className='required'>*</span>}
      </label>
      <Element id={labelFor} placeholder={placeholder} className='form-control'></Element>
      <span className='form-error'></span>
    </div>
  );
};

FormGroup.propTypes = {
  type: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  labelFor: PropTypes.string.isRequired,
};

export default FormGroup;
