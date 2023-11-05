import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Button.scss';

const Button = ({ type, children, primary = false, secondary = false, className = '', to }) => {
  const commonProps = {
    className: `${className} ${primary ? 'btn-primary' : ''} ${secondary ? 'btn-secondary' : ''}`,
    children,
  };

  if (type === 'a') {
    return <Link to={to} {...commonProps}></Link>;
  } else if (type === 'button') {
    return <button {...commonProps}></button>;
  } else return null;
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  className: PropTypes.string,
  to: PropTypes.string,
};

export default Button;
