import Proptypes from "prop-types";
import "./FormGroup.scss";

const FormGroup = ({ type, labelName, required = false, className = "", placeholder = labelName, labelFor }) => {
  const Element = type == "text" ? "textarea" : "input";
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={labelFor}>
        {labelName} {required && <span className="required">*</span>}
      </label>
      <Element id={labelFor} placeholder={placeholder} className="form-control"></Element>
    </div>
  );
};

FormGroup.propTypes = {
  type: Proptypes.string.isRequired,
  labelName: Proptypes.string.isRequired,
  required: Proptypes.bool,
  className: Proptypes.string,
  placeholder: Proptypes.string,
  labelFor: Proptypes.string.isRequired,
};

export default FormGroup;
