import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '~/components/Admin/Header/Header';
import SideBar from '~/components/Admin/SideBar/SideBar';
import Loading from '~/components/Loading/Loading';
import ToastMessage from '~/components/ToastMessage/ToastMessage';
import { resetToast } from '~/redux/slides/ToastSlide';
import './AdminLayout.scss';

const AdminLayout = ({ children }) => {
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
    <div className='admin'>
      {toast.status && (
        <ToastMessage
          status={toast.status}
          message={toast.message}
          handleClose={() => dispatch(resetToast())}
        />
      )}
      {loading.isLoading && <Loading />}
      <Header></Header>

      <div className='admin-container'>
        <SideBar></SideBar>
        <div className='admin-content'>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
