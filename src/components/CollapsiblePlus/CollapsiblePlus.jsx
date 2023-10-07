import { useRef } from 'react';
import './CollapsiblePlus.scss';

const CollapsiblePlus = () => {
  const collapsibleRef = useRef();

  const handleClickCollapsible = () => {
    const navItem = collapsibleRef.current.parentNode;
    navItem.classList.toggle('active');
  };
  return (
    <div className='collapsible-plus' ref={collapsibleRef} onClick={handleClickCollapsible}>
      <span></span>
      <span></span>
    </div>
  );
};

export default CollapsiblePlus;
