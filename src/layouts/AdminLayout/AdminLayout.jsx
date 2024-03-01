import Header from '~/components/Admin/Header/Header';
import SideBar from '~/components/Admin/SideBar/SideBar';

const AdminLayout = ({ children }) => {
  return (
    <>
      <Header></Header>

      <div className='admin-container'>
        <SideBar></SideBar>
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
