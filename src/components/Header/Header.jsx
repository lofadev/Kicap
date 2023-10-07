import { useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';
import Cart from '../../assets/imgs/add-to-basket.svg';
import Logo from '../../assets/imgs/logo.png';
import Search from '../../assets/imgs/search.svg';
import FormSearch from '../FormSearch/FormSearch';
import './Header.scss';

const menu = [
  {
    id: 1,
    name: 'Trang chủ',
    hasChild: false,
    navigate: '/',
  },
  {
    id: 2,
    name: 'Keycap bộ',
    hasChild: true,
    navigate: '/keycap-bo',
    children: [
      { id: 1, title: 'Keycap Cherry', navigate: '/keycap-cherry' },
      { id: 2, title: 'Keycap xuyên led', navigate: '/keycap-xuyen-led' },
      { id: 3, title: 'Keycap SA', navigate: '/keycap-sa' },
      { id: 4, title: 'Keycap XDA', navigate: '/keycap-xda' },
      { id: 5, title: 'Keycap OEM', navigate: '/keycap-oem' },
    ],
  },
  {
    id: 3,
    name: 'Mods phím',
    hasChild: false,
    navigate: '/mods-ban-phim-co',
  },
  {
    id: 4,
    name: 'Pre-order',
    hasChild: false,
    navigate: '/pre-order',
  },
  {
    id: 5,
    name: 'Decor',
    hasChild: false,
    navigate: '/den-decor',
  },
  {
    id: 6,
    name: 'Sản phẩm',
    navigate: '/collections/all',
    hasMega: true,
    children: [
      {
        id: 1,
        title: 'Keycap bộ',
        navigate: '/keycap-bo',
        subtitle: ['Silent forest', 'SA Harry Potter', 'Keycap Polar Day'],
      },
      {
        id: 2,
        title: 'Keycap lẻ',
        navigate: '/keycap-le',
        subtitle: ['PIKACHU ALU', 'CARD VGA', 'CỜ ĐẢNG BÚA LIỀM'],
      },
      {
        id: 3,
        title: 'Đèn decor',
        navigate: '/keycap-le',
        subtitle: [],
      },
      {
        id: 4,
        title: 'Bàn phím cơ',
        navigate: '/ban-phim-co',

        subtitle: ['Monsgeek M1W', 'FL CMK75', 'Finalkey V81 Plus'],
      },
      {
        id: 5,
        title: 'Switch',
        navigate: '/switch',
        subtitle: ['WS Morandi', 'KTT Matcha', 'Akko Cream Yellow Pro'],
      },
      {
        id: 6,
        title: 'Phụ kiện',
        navigate: '/phu-kien',
        subtitle: ['Túi đựng bàn phím', 'Dụng cụ thay keycap', 'Chổi quét phím'],
      },
    ],
  },
  {
    id: 7,
    name: 'Blog',
    hasChild: false,
    navigate: '/tin-tuc',
  },
  {
    id: 8,
    name: 'Về kicap',
    hasChild: true,
    navigate: '/gioi-thieu',
    children: [
      { id: 1, title: 'Giới thiệu', navigate: '/gioi-thieu' },
      { id: 2, title: 'Liên hệ', navigate: '/lien-he' },
      { id: 3, title: 'Chính sách bảo hành', navigate: '/policy/chinh-sach-bao-hanh' },
      { id: 4, title: 'Chính sách đổi trả', navigate: '/policy/chinh-sach-doi-tra-hang-hoan-tien' },
    ],
  },
];

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
                    <></>
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
                          {itemChild.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ''
                )}
                {item.hasMega ? (
                  <div className='mega-menu'>
                    {item.children.map((item) => (
                      <div key={item.id} className='mega-items'>
                        <Link to={item.navigate} className='mega-title' onClick={handleCLickLink}>
                          {item.title}
                          {item.subtitle.length > 0 && (
                            <span className='hidden-lg icon-dropdown'>
                              <FaAngleDown></FaAngleDown>
                            </span>
                          )}
                        </Link>
                        <ul className='mega-submenu'>
                          {item.subtitle.map((subItem, index) => (
                            <li key={index}>
                              <Link to='/' onClick={handleCLickLink}>
                                {subItem}
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
