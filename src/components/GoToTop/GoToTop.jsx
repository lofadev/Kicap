import { useEffect, useRef } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import './GoToTop.scss';
import { useLocation } from 'react-router-dom';

const GoToTop = () => {
  const goToTopRef = useRef();
  const location = useLocation();

  const handleGoToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => handleGoToTop, [location.pathname]);

  useEffect(() => {
    function hanleScroll() {
      if (this.scrollY > 300) {
        goToTopRef.current.style = 'opacity: 1;';
      } else {
        goToTopRef.current.style = 'opacity: 0;';
      }
    }
    window.addEventListener('scroll', hanleScroll);
    return () => {
      window.removeEventListener('scroll', hanleScroll);
    };
  }, []);
  return (
    <div className='gototop' onClick={handleGoToTop} ref={goToTopRef}>
      <span>Lên đầu trang</span>
      <FaLongArrowAltRight />
    </div>
  );
};

export default GoToTop;
