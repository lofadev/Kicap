import { useEffect, useState } from 'react';
import { BiSolidCategory } from 'react-icons/bi';
import { FaArrowAltCircleRight, FaUser } from 'react-icons/fa';
import { FaBarsProgress, FaCartFlatbed } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardBox from '~/components/Admin/DashboardBox/DashboardBox';
import Revenue from '~/components/Admin/Revenue/Revenue';
import DashboardService from '~/services/DashboardService';
import './Dashboard.scss';
import OrderService from '~/services/OrderService';
import { formatPriceToVND, timestampsToDate } from '~/utils/utils';
import DataTable from '~/components/DataTable/DataTable';

const dashboard = [
  {
    id: 1,
    name: 'Quản lý sản phẩm',
    icon: FaBarsProgress,
    quantity: 0,
    to: '/admin/products',
    color: 'var(--blue)',
  },
  {
    id: 2,
    name: 'Quản lý khách hàng',
    icon: FaUser,
    quantity: 0,
    to: '/admin/customers',
    color: 'var(--green)',
  },
  {
    id: 3,
    name: 'Quản lý danh mục sản phẩm',
    icon: BiSolidCategory,
    quantity: 0,
    to: '/admin/categories',
    color: 'var(--yellow)',
  },
  {
    id: 4,
    name: 'Quản lý đơn đặt hàng',
    icon: FaCartFlatbed,
    quantity: 0,
    to: '/admin/orders',
    color: 'var(--red)',
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboardCount, setDashboardCount] = useState(dashboard);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [resDash, resOrder] = await Promise.all([
        DashboardService.getDashBoard(dispatch),
        OrderService.getOrders({ limit: 5 }, dispatch),
      ]);
      if (resDash.status === 'OK') {
        const { product, user, category, order } = resDash.data;
        const counts = [product, user, category, order];
        const newDashboard = dashboardCount.map((item, index) => {
          return {
            ...item,
            quantity: counts[index],
          };
        });
        setDashboardCount(newDashboard);
      }
      if (resOrder.status === 'OK') {
        const orders = resOrder.data.map((order) => {
          return {
            id: order._id,
            fullName: order.fullName,
            orderTime: timestampsToDate(order.orderTime),
            totalPrice: order.totalPrice,
            isPaid: order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
          };
        });
        setOrders(orders);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='dashboard'>
      <div className='dashboard-menu'>
        {dashboardCount.map((item) => (
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

          <Link to={'/admin/orders'} className='new-orders-link'>
            Xem tất cả các đơn đặt hàng <FaArrowAltCircleRight />
          </Link>
        </div>
      </div>
      <DataTable
        rows={orders}
        head={['Khách hàng', 'Ngày lập', 'Tổng tiền', 'Trạng thái thanh toán']}
        keys={['fullName', 'orderTime', 'totalPrice', 'isPaid']}
        updateTo='order'
        isDetails
      />
    </div>
  );
};

export default Dashboard;
