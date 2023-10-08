import { useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';
import { menu } from '~/../data';
import Cart from '~/assets/imgs/add-to-basket.svg';
import Logo from '~/assets/imgs/logo.png';
import Search from '~/assets/imgs/search.svg';
import FormSearch from '../FormSearch/FormSearch';
import './Header.scss';

const Header = () => {
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [isActiveOverlay, setIsActiveOverlay] = useState(false);
  const [isActiveMenubar, setIsActiveMenubar] = useState(false);
  const navRef = useRef();

  const handleToggleInSearch = () => {
    setIsActiveSearch((prev) => !prev);
    setIsActiveOverlay((prev) => !prev);
  };

  const handleToggleOverlay = () => {
    setIsActiveOverlay((prev) => !prev);
    if (isActiveMenubar) {
      const dropdownShoweds = document.querySelectorAll('.height-auto');
      dropdownShoweds.forEach((dropdown) => {
        dropdown.classList.remove('height-auto');
      });
      setIsActiveMenubar((prev) => !prev);
    }
    if (isActiveSearch) {
      setIsActiveSearch((prev) => !prev);
    }
  };

  const handleShowMenuBar = () => {
    setIsActiveMenubar(true);
    setIsActiveOverlay((prev) => !prev);
  };

  const handleCLickLink = (e) => {
    if (e.target.closest('.icon-dropdown')) {
      e.preventDefault();
      let navLink = e.target;
      while (
        !navLink.classList.value.includes('nav-link') &&
        !navLink.classList.value.includes('mega-title')
      ) {
        navLink = navLink.parentNode;
      }
      const dropDown = navLink.nextElementSibling;
      dropDown.classList.toggle('height-auto');
    } else if (isActiveMenubar) {
      handleToggleOverlay();
    }
  };

  return (
    <header className='header'>
      <div
        className={`overlay ${isActiveOverlay ? 'active' : ''}`}
        onClick={handleToggleOverlay}
      ></div>
      <FormSearch onClick={handleToggleInSearch} searchActive={isActiveSearch} />
      <div className='container'>
        <div className='top_header'>
          <div className='top_header-text'>
            <span>Hotline tư vấn: </span>
            <a href='tel:0369161095' className='text-hover-primary'>
              0369161095
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
                <Link to='/'>Tài khoản</Link>
                <ul>
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
                </ul>
              </li>

              <li className='top_header-cart'>
                <Link to='/cart'>
                  <span className='top_header-cart-name'>Giỏ hàng </span>
                  <img src={Cart} alt='' />
                  <span className='top_header-cart-count'>0</span>
                </Link>
              </li>

              <li className='top_header-search' onClick={() => handleToggleInSearch()}>
                <img src={Search} alt='' />
              </li>
            </ul>
          </div>
        </div>

        <nav className={`nav ${isActiveMenubar ? 'active' : ''}`} ref={navRef}>
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
                  onClick={handleCLickLink}
                >
                  {item.name}
                  {item.hasChild || item.hasMega ? (
                    <span className='icon-dropdown'>
                      <FaAngleDown></FaAngleDown>
                    </span>
                  ) : (
                    ''
                  )}
                </NavLink>
                {item.hasChild ? (
                  <ul className='dropdown-menu'>
                    {item.children.map((itemChild, index) => (
                      <li key={index} className='dropdown-items'>
                        <Link
                          className='text-hover-primary'
                          to={itemChild.navigate}
                          onClick={handleCLickLink}
                        >
                          {itemChild.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ''
                )}
                {item.hasMega ? (
                  <div className='mega-menu'>
                    {item.children.map((submenu) => (
                      <div key={submenu.id} className='mega-items'>
                        <Link
                          to={submenu.navigate}
                          className='mega-title'
                          onClick={handleCLickLink}
                        >
                          {submenu.name}
                          {submenu.sub_children.length > 0 && (
                            <span className='hidden-lg icon-dropdown'>
                              <FaAngleDown></FaAngleDown>
                            </span>
                          )}
                        </Link>
                        <ul className='mega-submenu'>
                          {submenu.sub_children.map((subitem) => (
                            <li key={subitem.id}>
                              <Link to={subitem.navigate} onClick={handleCLickLink}>
                                {subitem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  ''
                )}
              </li>
            ))}
            {isActiveMenubar && (
              <>
                <li className='nav-items hidden-lg'>
                  <Link className='nav-link' to={'/account/login'}>
                    Đăng nhập
                  </Link>
                </li>
                <li className='nav-items hidden-lg'>
                  <Link className='nav-link' to={'/account/register'}>
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
