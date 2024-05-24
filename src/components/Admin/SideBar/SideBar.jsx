import { useEffect, useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { BiSolidCategory } from 'react-icons/bi';
import { FaCarSide, FaCartPlus, FaFolder, FaPeopleCarry, FaUser } from 'react-icons/fa';
import { FaCartFlatbed } from 'react-icons/fa6';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { PiSlideshowFill } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';
import Dropdown from '~/components/Header/components/Dropdown/Dropdown';
import './SideBar.scss';

const menuLarge = [
  {
    name: 'Bảng điều khiển',
    to: '/admin/dashboard',
    icon: AiFillDashboard,
  },
  {
    name: 'Quản lý dữ liệu',
    to: null,
    icon: FaFolder,
    children: [
      {
        name: 'Sản phẩm',
        to: '/admin/products',
        icon: MdOutlineProductionQuantityLimits,
      },
      {
        name: 'Danh mục sản phẩm',
        to: '/admin/categories',
        icon: BiSolidCategory,
      },
      {
        name: 'Slides banner',
        to: '/admin/slides',
        icon: PiSlideshowFill,
      },
      {
        name: 'Nhà cung cấp',
        to: '/admin/suppliers',
        icon: FaPeopleCarry,
      },
      {
        name: 'Người giao hàng',
        to: '/admin/shippers',
        icon: FaCarSide,
      },
      {
        name: 'Khách hàng',
        to: '/admin/customers',
        icon: FaUser,
      },
    ],
  },
  {
    name: 'Quản lý bán hàng',
    to: null,
    icon: FaFolder,
    children: [
      {
        name: 'Đơn đặt hàng',
        to: '/admin/orders',
        icon: FaCartFlatbed,
      },
      {
        name: 'Lập đơn hàng',
        to: '/admin/order/add',
        icon: FaCartPlus,
      },
    ],
  },
];

const menuSmall = [
  {
    name: 'Bảng điều khiển',
    to: '/admin/dashboard',
    icon: AiFillDashboard,
  },

  {
    name: 'Sản phẩm',
    to: '/admin/products',
    icon: MdOutlineProductionQuantityLimits,
  },
  {
    name: 'Danh mục sản phẩm',
    to: '/admin/categories',
    icon: BiSolidCategory,
  },
  {
    name: 'Slides banner',
    to: '/admin/slides',
    icon: PiSlideshowFill,
  },
  {
    name: 'Nhà cung cấp',
    to: '/admin/suppliers',
    icon: FaPeopleCarry,
  },
  {
    name: 'Người giao hàng',
    to: '/admin/shippers',
    icon: FaCarSide,
  },
  {
    name: 'Khách hàng',
    to: '/admin/customers',
    icon: FaUser,
  },

  {
    name: 'Đơn đặt hàng',
    to: '/admin/orders',
    icon: FaCartFlatbed,
  },
  {
    name: 'Lập đơn hàng',
    to: '/admin/order/add',
    icon: FaCartPlus,
  },
];

const SideBar = ({ isSmall, children }) => {
  const [itemActive, setItemActive] = useState(0);
  const [menu, setMenu] = useState(menuLarge);

  useEffect(() => {
    if (isSmall) {
      setMenu(menuSmall);
    } else {
      setMenu(menuLarge);
    }
  }, [isSmall]);

  const handleClickItem = (index) => {
    if (itemActive === index) setItemActive(-1);
    else if (menu[index].children) setItemActive(index);
  };

  return (
    <div className={`sidebar ${isSmall ? 'small' : ''}`}>
      {children}
      <ul className='sidebar-menu'>
        {menu.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={item.name} className={`sidebar-items ${itemActive === index ? 'active' : ''}`}>
              {item.to ? (
                <NavLink
                  to={item.to}
                  className='sidebar-title'
                  onClick={() => handleClickItem(index)}
                >
                  <Icon />{' '}
                  {!isSmall && (
                    <>
                      <span className='sidebar-name'>{item.name}</span>{' '}
                      {item.children && <Dropdown />}
                    </>
                  )}
                </NavLink>
              ) : (
                <span className='sidebar-title' onClick={() => handleClickItem(index)}>
                  <Icon /> <span className='sidebar-name'>{item.name}</span>{' '}
                  {item.children && <Dropdown />}
                </span>
              )}

              {item.children && (
                <ul className='sidebar-dropdown'>
                  {item.children &&
                    item.children.map((subitem) => {
                      const Icon = subitem.icon;
                      return (
                        <li key={subitem.name}>
                          <NavLink to={subitem.to}>
                            <Icon />
                            {subitem.name}
                          </NavLink>
                        </li>
                      );
                    })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SideBar;
