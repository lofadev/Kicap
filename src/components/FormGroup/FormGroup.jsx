import PropTypes from 'prop-types';
import './FormGroup.scss';

const FormGroup = ({
  type,
  typeInput,
  labelName,
  required = false,
  placeholder = labelName,
  labelFor,
}) => {
  const Element = type == 'text' ? 'textarea' : 'input';
  return (
    <div className="form-group">
      <label htmlFor={labelFor}>
        {labelName} {required && <span className='required'>*</span>}
      </label>
      <Element
        type={typeInput}
        id={labelFor}
        placeholder={placeholder}
        className='form-control'
      ></Element>
      {/* <span className='form-error'></span> */}
    </div>
  );
};

FormGroup.propTypes = {
  type: PropTypes.string.isRequired,
  typeInput: PropTypes.string,
  labelName: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  labelFor: PropTypes.string.isRequired,
};

export default FormGroup;
