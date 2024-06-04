import { IoMdArrowDropdown } from 'react-icons/io';
import { MdOutlineLogout } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = ({ isSmall }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/account/login');
  };

  return (
    <div className='header'>
      <h1 className={`header-shop-name ${isSmall ? 'ml-10' : ''}`}>
        <Link to='/admin/dashboard'>Kicap shop</Link>
      </h1>

      <div className='header-right'>
        <RiAdminFill style={{ marginRight: '5px' }} />
        <span className='name'>ADMIN</span>
        <IoMdArrowDropdown />
        <div className='dropdown-logout' onClick={handleLogout}>
          <span>Đăng xuất</span>
          <MdOutlineLogout />
        </div>
      </div>
    </div>
  );
};

export default Header;
