import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Button.scss';

const Button = ({
  type = 'button',
  children,
  primary = false,
  secondary = false,
  className = '',
  disabled,
  to,
  ...props
}) => {
  const navigator = useNavigate();
  const commonProps = {
    className: `${className} ${primary ? 'btn-primary' : ''} ${secondary ? 'btn-secondary' : ''}`,
    children,
    type,
    disabled,
  };

  return <button {...commonProps} onClick={() => navigator(to)} {...props}></button>;
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
