import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import './Account.scss';
import Address from './components/Address/Address';
import ChangePassword from './components/ChangePassword/ChangePassword';
import Info from './components/Info/Info';
import Orders from './components/Orders/Orders';

const sidebarMenu = [
  {
    to: '/account',
    title: 'Thông tin tài khoản',
  },
  {
    to: '/account/orders',
    title: 'Đơn hàng của bạn',
  },
  {
    to: '/account/changepassword',
    title: 'Đổi mật khẩu',
  },
  {
    to: '/account/address',
    title: 'Địa chỉ',
  },
];

const Account = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { type } = useParams();

  useEffect(() => {
    if (!user.name) navigate('/account/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='account'>
      <div className='container'>
        {!type && <SectionBreadCrumb child={'Trang tài khoản'}></SectionBreadCrumb>}
        {type === 'orders' && (
          <SectionBreadCrumb
            parent={'Trang tài khoản'}
            navigate={'account'}
            child={'Đơn đặt hàng'}
          ></SectionBreadCrumb>
        )}
        {type === 'changepassword' && (
          <SectionBreadCrumb
            parent={'Trang tài khoản'}
            navigate={'account'}
            child={'Đổi mật khẩu'}
          ></SectionBreadCrumb>
        )}
        {type === 'address' && (
          <SectionBreadCrumb
            parent={'Trang tài khoản'}
            navigate={'account'}
            child={'Địa chỉ'}
          ></SectionBreadCrumb>
        )}

        <div className='account-content'>
          <div className='account-sidebar'>
            <h5 className='title-account'>Trang tài khoản</h5>
            <p>
              Xin chào, <span>{user.name}</span>
            </p>

            <ul className='account-sidebar-menu'>
              {sidebarMenu.map((item) => {
                return (
                  <li key={item.to}>
                    <NavLink end to={item.to} className='account-sidebar-items'>
                      {item.title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {!type && <Info />}
          {type === 'orders' && <Orders />}
          {type === 'changepassword' && <ChangePassword />}
          {type === 'address' && <Address />}
        </div>
      </div>
    </div>
  );
};

export default Account;
