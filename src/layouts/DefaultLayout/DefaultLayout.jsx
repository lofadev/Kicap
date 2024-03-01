import PropTypes from 'prop-types';
import Footer from '~/components/Footer/Footer';
import GoToTop from '~/components/GoToTop/GoToTop';
import Header from '~/components/Header/Header';

const DefaultLayout = ({ children }) => {
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
