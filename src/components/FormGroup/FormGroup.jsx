import Proptypes from "prop-types";
import "./FormGroup.scss";

const FormGroup = ({ type, labelName, required = false, className = "" }) => {
  const Element = type == "text" ? "textarea" : "input";
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor="">
        {labelName} {required && <span className="required">*</span>}
      </label>
      <Element name="content" id="" placeholder={labelName} className="form-control"></Element>
    </div>
  );
};

FormGroup.propTypes = {
  type: Proptypes.string.isRequired,
  labelName: Proptypes.string.isRequired,
  required: Proptypes.bool,
  className: Proptypes.string,
};

export default FormGroup;
