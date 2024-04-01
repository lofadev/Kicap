import PropTypes from 'prop-types';
import './FormGroup.scss';

const FormGroup = ({ labelName, required = false, name = '', error = false, children }) => {
  return (
    <div className='form-group'>
      {labelName && (
        <label htmlFor={name}>
          {labelName} {required && <span className='required'>*</span>}
        </label>
      )}
      {children}

      {error && <span className='form-error'>{error}</span>}
    </div>
  );
};

FormGroup.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default FormGroup;
