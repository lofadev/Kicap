import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { menu } from '~/../data';
import Cart from '~/assets/imgs/add-to-basket.svg';
import Logo from '~/assets/imgs/logo.png';
import Search from '~/assets/imgs/search.svg';
import { resetUser } from '~/redux/slides/UserSlide';
import UserService from '~/services/UserService';
import FormSearch from '../FormSearch/FormSearch';
import './Header.scss';
import Dropdown from './components/Dropdown/Dropdown';

const Header = () => {
  const navigate = useNavigate();
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [isActiveOverlay, setIsActiveOverlay] = useState(false);
  const [isActiveMenubar, setIsActiveMenubar] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleToggleSearch = () => {
    setIsActiveSearch((prev) => !prev);
    setIsActiveOverlay((prev) => !prev);
  };

  const handleLogout = async () => {
    await UserService.logoutUser(dispatch);
    dispatch(resetUser());
    localStorage.clear();
    navigate('/account/login');
  };

  const handleToggleOverlay = (e) => {
    if (!e.target.closest('.icon-dropdown')) {
      if (isActiveMenubar) {
        setIsActiveOverlay((prev) => !prev);
        setIsActiveMenubar((prev) => !prev);
      } else if (isActiveSearch) {
        setIsActiveOverlay((prev) => !prev);
        setIsActiveSearch((prev) => !prev);
      }
    }
  };

  const handleShowMenuBar = () => {
    setIsActiveMenubar(true);
    setIsActiveOverlay((prev) => !prev);
  };

  return (
    <header className='header'>
      <div
        className={`overlay ${isActiveOverlay ? 'active' : ''}`}
        onClick={handleToggleOverlay}
      ></div>
      <FormSearch onClick={handleToggleSearch} searchActive={isActiveSearch} />
      <div className='container'>
        <div className='top_header'>
          <div className='top_header-text'>
            <span>Hotline tư vấn: </span>
            <a href='tel:0379252637' className='text-hover-primary'>
              0379252637
            </a>
          </div>
          <div className='top_header-bar hidden-lg'>
            <div className='top_header-bar--inner' onClick={handleShowMenuBar}>
              <FaBars />
            </div>
          </div>

          <div className='top_header-logo'>
            <Link to='/'>
              <img src={Logo} alt='' />
            </Link>
          </div>

          <div className='top_header-right'>
            <ul className='top_header-features'>
              <li className='top_header-account'>
                <Link to='/account'>Tài khoản</Link>
                <ul>
                  {user.name ? (
                    <>
                      <li>
                        <Link to='/account' title='Tài khoản'>
                          xin chào, {user.name}
                        </Link>
                      </li>
                      <li>
                        <Link title='Đăng xuất' onClick={handleLogout}>
                          Đăng xuất
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to='/account/login' title='Đăng nhập'>
                          Đăng nhập
                        </Link>
                      </li>
                      <li>
                        <Link to='/account/register' title='Đăng ký'>
                          Đăng ký
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>

              <li className='top_header-cart'>
                <Link to='/cart'>
                  <span className='top_header-cart-name'>Giỏ hàng </span>
                  <img src={Cart} alt='' />
                  <span className='top_header-cart-count'>0</span>
                </Link>
              </li>

              <li className='top_header-search' onClick={() => handleToggleSearch()}>
                <img src={Search} alt='' />
              </li>
            </ul>
          </div>
        </div>

        <nav className={`nav ${isActiveMenubar ? 'active' : ''}`}>
          <ul className='nav-menu'>
            {menu.map((item) => (
              <li
                key={item.id}
                className={`nav-items ${
                  item.hasChild ? 'has-childs' : item.hasMega ? 'has-mega' : ''
                }`}
              >
                <NavLink
                  className='nav-link text-hover-primary'
                  to={item.navigate}
                  onClick={handleToggleOverlay}
                >
                  {item.name}
                  {(item.hasChild || item.hasMega) && <Dropdown />}
                </NavLink>
                {item.hasChild && (
                  <ul className='dropdown-menu'>
                    {item.children.map((itemChild, index) => (
                      <li key={index} className='dropdown-items'>
                        <Link
                          className='text-hover-primary'
                          to={itemChild.navigate}
                          onClick={handleToggleOverlay}
                        >
                          {itemChild.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {item.hasMega && (
                  <div className='mega-menu'>
                    {item.children.map((submenu) => (
                      <div key={submenu.id} className='mega-items'>
                        <Link
                          to={submenu.navigate}
                          className='mega-title'
                          onClick={handleToggleOverlay}
                        >
                          {submenu.name}
                          {submenu.sub_children.length > 0 && <Dropdown className={'hidden-lg'} />}
                        </Link>
                        <ul className='mega-submenu'>
                          {submenu.sub_children.map((subitem) => (
                            <li key={subitem.id}>
                              <Link to={subitem.navigate} onClick={handleToggleOverlay}>
                                {subitem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
            {isActiveMenubar && user.name && (
              <>
                <li
                  className='nav-items hidden-lg'
                  style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid' }}
                >
                  <Link className='nav-link' to={'/account'} onClick={handleToggleOverlay}>
                    {user.name}
                  </Link>
                </li>
                <li className='nav-items hidden-lg'>
                  <Link
                    className='nav-link'
                    title='Đăng xuất'
                    onClick={() => {
                      handleLogout();
                      setIsActiveOverlay((prev) => !prev);
                      setIsActiveMenubar((prev) => !prev);
                    }}
                  >
                    Đăng xuất
                  </Link>
                </li>
              </>
            )}
            {isActiveMenubar && !user.name && (
              <>
                <li className='nav-items hidden-lg'>
                  <Link className='nav-link' to={'/account/login'} onClick={handleToggleOverlay}>
                    Đăng nhập
                  </Link>
                </li>
                <li className='nav-items hidden-lg'>
                  <Link className='nav-link' to={'/account/register'} onClick={handleToggleOverlay}>
                    Đăng ký
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
