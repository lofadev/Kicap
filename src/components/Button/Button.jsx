import Proptypes from "prop-types";
import "./Button.scss";

const Button = ({ type, children, primary = false, secondary = false, className = "" }) => {
  const commonProps = {
    className: `${className} ${primary ? "btn-primary" : ""} ${secondary ? "btn-secondary" : ""}`,
    children,
  };

  if (type === "a") {
    return <a href="" {...commonProps}></a>;
  } else if (type === "button") {
    return <button {...commonProps}></button>;
  } else return null;
};

Button.propTypes = {
  type: Proptypes.string.isRequired,
  children: Proptypes.node.isRequired,
  primary: Proptypes.bool,
  secondary: Proptypes.bool,
  className: Proptypes.string,
};

export default Button;
