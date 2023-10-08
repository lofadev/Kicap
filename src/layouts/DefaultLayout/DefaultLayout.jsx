import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '~/components/Footer/Footer';
import GoToTop from '~/components/GoToTop/GoToTop';
import Header from '~/components/Header/Header';

const DefaultLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);
  return (
    <>
      <Header></Header>
      <div className='main-content'>{children}</div>
      <Footer></Footer>
      <GoToTop></GoToTop>
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
