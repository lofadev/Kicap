import Header from '~/components/Admin/Header/Header';
import SideBar from '~/components/Admin/SideBar/SideBar';
import './AdminLayout.scss';

const AdminLayout = ({ children }) => {
  return (
    <div className='admin'>
      <Header></Header>

      <div className='admin-container'>
        <SideBar></SideBar>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
