import { BiSolidCategory } from 'react-icons/bi';
import { FaArrowAltCircleRight, FaUser } from 'react-icons/fa';
import { FaBarsProgress, FaCartFlatbed } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import DashboardBox from '~/components/Admin/DashboardBox/DashboardBox';
import Revenue from '~/components/Admin/Revenue/Revenue';
import DataTable from '~/components/DataTable/DataTable';
import './Dashboard.scss';

const dashboard = [
  {
    id: 1,
    name: 'Quản lý sản phẩm',
    icon: FaBarsProgress,
    quantity: 2000,
    to: '/admin/dashboard',
    color: 'var(--blue)',
  },
  {
    id: 2,
    name: 'Quản lý khách hàng',
    icon: FaUser,
    quantity: 0,
    to: '/admin/dashboard',
    color: 'var(--green)',
  },
  {
    id: 3,
    name: 'Quản lý danh mục sản phẩm',
    icon: BiSolidCategory,
    quantity: 0,
    to: '/admin/dashboard',
    color: 'var(--yellow)',
  },
  {
    id: 4,
    name: 'Quản lý đơn đặt hàng',
    icon: FaCartFlatbed,
    quantity: 0,
    to: '/admin/dashboard',
    color: 'var(--red)',
  },
];

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard-menu'>
        {dashboard.map((item) => (
          <DashboardBox
            key={item.id}
            icon={item.icon}
            name={item.name}
            to={item.to}
            quantity={item.quantity}
            color={item.color}
          />
        ))}
      </div>

      <Revenue />

      <div className='new-orders'>
        <div className='new-orders-heading'>
          <span>
            <FaCartFlatbed /> Đơn hàng mới
          </span>

          <Link to={''} className='new-orders-link'>
            Xem tất cả các đơn đặt hàng mới <FaArrowAltCircleRight />
          </Link>
        </div>
      </div>
      <DataTable />
    </div>
  );
};

export default Dashboard;
