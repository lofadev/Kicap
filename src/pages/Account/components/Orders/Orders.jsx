import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '~/components/DataTable/DataTable';
import OrderService from '~/services/OrderService';
import OrderStatusService from '~/services/OrderStatusService';
import { timestampsToDatetime } from '~/utils/utils';

const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const [resOrders, resStatuses] = await Promise.all([
        OrderService.getOrdersByUserID(user.id, dispatch),
        OrderStatusService.getOrderStatuses({}, dispatch),
      ]);
      if (resOrders.status === 'OK' && resStatuses.status === 'OK') {
        const rowsData = resOrders.data.map((order) => {
          const { _id, orderID, orderTime, totalPrice, isPaid, status } = order;
          const statusName = resStatuses.data.find((st) => st.status === status).description;
          return {
            id: _id,
            orderID,
            orderTime: timestampsToDatetime(orderTime),
            totalPrice,
            isPaid,
            status: statusName,
          };
        });
        setRows(rowsData);
      }
    };

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='orders'>
      <DataTable
        rows={rows}
        head={['Mã đơn hàng', 'Ngày đặt', 'Tổng tiền', 'Trạng thái đơn hàng']}
        keys={['orderID', 'orderTime', 'totalPrice', 'status']}
        isDetails
      />
    </div>
  );
};

export default Orders;
