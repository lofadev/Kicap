import { AiFillDashboard } from 'react-icons/ai';
import { BiSolidCategory } from 'react-icons/bi';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { FaCartFlatbed } from 'react-icons/fa6';
import { MdCategory, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { PiSlideshowFill } from 'react-icons/pi';
import { RiAdminFill } from 'react-icons/ri';
import './SideBar.scss';

const menu = [
  {
    item: 'Bảng điều khiển',
    to: '/dashboard',
    icon: AiFillDashboard,
  },
  {
    item: 'Quản lý sản phẩm',
    to: null,
    icon: MdOutlineProductionQuantityLimits,
    children: [
      {
        item: 'Thêm sản phẩm',
        to: '/product/add',
      },
      {
        item: 'Xem sản phẩm',
        to: '/product/view',
      },
    ],
  },
  {
    item: 'Quản lý danh mục sản phẩm',
    to: null,
    icon: BiSolidCategory,
    children: [
      {
        item: 'Thêm danh mục sản phẩm',
        to: '/category/add',
      },
      {
        item: 'Xem danh mục sản phẩm',
        to: '/category/view',
      },
    ],
  },
  {
    item: 'Quản lý thể loại',
    to: null,
    icon: MdCategory,
    children: [
      {
        item: 'Thêm thể loại',
        to: '/type/add',
      },
      {
        item: 'Xem thể loại',
        to: '/type/view',
      },
    ],
  },
  {
    item: 'Quản lý slides banner',
    to: null,
    icon: PiSlideshowFill,
    children: [
      {
        item: 'Thêm slides banner',
        to: '/slide/add',
      },
      {
        item: 'Xem slides banner',
        to: '/slide/view',
      },
    ],
  },
  {
    item: 'Quản lý khách hàng',
    to: '/users/view',
    icon: FaUser,
  },
  {
    item: 'Quản lý đơn đặt hàng',
    to: '/orders/view',
    icon: FaCartFlatbed,
  },
  {
    item: 'Quản lý admin',
    to: '/orders/view',
    icon: RiAdminFill,
  },
  {
    item: 'Đăng xuất',
    to: '/logout',
    icon: FaSignOutAlt,
  },
];

const SideBar = () => {
  return <div className='side-bar'></div>;
};

export default SideBar;
