import Header from '~/components/Admin/Header/Header';
import SideBar from '~/components/Admin/SideBar/SideBar';
import './AdminLayout.scss';

const AdminLayout = ({ children }) => {
  return (
    <div className='admin'>
      <Header></Header>

      <div className='admin-container'>
        <SideBar></SideBar>
        <div className='admin-content'>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
