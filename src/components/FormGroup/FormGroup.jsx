import "./FormGroup.scss";
import Proptypes from "prop-types";

const FormGroup = ({ type, labelName, required = false }) => {
  const Element = type == "text" ? "textarea" : "input";
  return (
    <div className="form-group">
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
};

export default FormGroup;
