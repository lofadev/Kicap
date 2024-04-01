import { useRef, useState } from 'react';
import { FaRegWindowMaximize, FaWindowMinimize } from 'react-icons/fa';
import './Box.scss';

const Box = ({ children, title }) => {
  const [hide, setHide] = useState(false);
  const boxRef = useRef();

  const handleToggleBox = () => {
    boxRef.current.classList.toggle('hide-box');
    setHide((prev) => !prev);
  };
  return (
    <div className='box' ref={boxRef}>
      <header>
        {title}{' '}
        <button onClick={handleToggleBox}>
          {hide ? <FaRegWindowMaximize /> : <FaWindowMinimize />}
        </button>
      </header>
      {children}
    </div>
  );
};

export default Box;
