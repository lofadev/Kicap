import { useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { BiSolidCategory } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { FaCartFlatbed } from 'react-icons/fa6';
import { MdCategory, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { PiSlideshowFill } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';
import Dropdown from '~/components/Header/components/Dropdown/Dropdown';
import './SideBar.scss';

const menu = [
  {
    name: 'Bảng điều khiển',
    to: '/admin/dashboard',
    icon: AiFillDashboard,
  },
  {
    name: 'Quản lý sản phẩm',
    to: null,
    icon: MdOutlineProductionQuantityLimits,
    children: [
      {
        name: 'Thêm sản phẩm',
        to: '/admin/product/add',
      },
      {
        name: 'Xem sản phẩm',
        to: '/admin/products',
      },
    ],
  },
  {
    name: 'Quản lý danh mục sản phẩm',
    to: null,
    icon: BiSolidCategory,
    children: [
      {
        name: 'Thêm danh mục sản phẩm',
        to: '/admin/category/add',
      },
      {
        name: 'Xem danh mục sản phẩm',
        to: '/admin/categorys',
      },
    ],
  },
  {
    name: 'Quản lý thể loại',
    to: null,
    icon: MdCategory,
    children: [
      {
        name: 'Thêm thể loại',
        to: '/admin/type/add',
      },
      {
        name: 'Xem thể loại',
        to: '/admin/types',
      },
    ],
  },
  {
    name: 'Quản lý slides banner',
    to: null,
    icon: PiSlideshowFill,
    children: [
      {
        name: 'Thêm slides banner',
        to: '/admin/slide/add',
      },
      {
        name: 'Xem slides banner',
        to: '/admin/slides',
      },
    ],
  },
  {
    name: 'Quản lý khách hàng',
    to: '/admin/customers',
    icon: FaUser,
  },
  {
    name: 'Quản lý đơn đặt hàng',
    to: '/admin/orders',
    icon: FaCartFlatbed,
  },
];

const SideBar = () => {
  const [itemActive, setItemActive] = useState(0);

  const handleClickItem = (index) => {
    if (itemActive === index) setItemActive(-1);
    else setItemActive(index);
  };
  return (
    <div className='sidebar'>
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
                  <Icon /> <span className='sidebar-name'>{item.name}</span>{' '}
                  {item.children && <Dropdown />}
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
                      return (
                        <li key={subitem.name}>
                          <NavLink to={subitem.to}>{subitem.name}</NavLink>
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
