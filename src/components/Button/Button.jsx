import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ type, children, primary = false, secondary = false, className = '' }) => {
  const commonProps = {
    className: `${className} ${primary ? 'btn-primary' : ''} ${secondary ? 'btn-secondary' : ''}`,
    children,
  };

  if (type === 'a') {
    return <a href='' {...commonProps}></a>;
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
};

export default Button;
