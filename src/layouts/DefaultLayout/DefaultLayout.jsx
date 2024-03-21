import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '~/components/Footer/Footer';
import GoToTop from '~/components/GoToTop/GoToTop';
import Header from '~/components/Header/Header';
import Loading from '~/components/Loading/Loading';
import ToastMessage from '~/components/ToastMessage/ToastMessage';
import { resetToast } from '~/redux/slides/ToastSlide';

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    const time = setTimeout(() => {
      if (toast) dispatch(resetToast());
    }, 5000);

    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  return (
    <>
      {toast.status && (
        <ToastMessage
          status={toast.status}
          title={toast.title}
          message={toast.message}
          handleClose={() => dispatch(resetToast())}
        />
      )}
      {loading.isLoading && <Loading />}
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
