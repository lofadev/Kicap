import { useRef } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import './Dropdown.scss';

const Dropdown = ({ className }) => {
  const dropdownRef = useRef();

  const handleShowDropdown = (e) => {
    e.preventDefault();
    const navItem = dropdownRef.current.parentNode.parentNode;
    navItem.classList.toggle('active');
  };

  return (
    <span
      className={`icon-dropdown ${className ?? ''}`}
      onClick={handleShowDropdown}
      ref={dropdownRef}
    >
      <FaAngleDown />
    </span>
  );
};

export default Dropdown;
