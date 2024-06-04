import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import DataTable from '~/components/DataTable/DataTable';
import ModalDialog from '~/components/ModalDialog/ModalDialog';
import OrderDetailsService from '~/services/OrderDetailsService';
import OrderService from '~/services/OrderService';
import OrderStatusService from '~/services/OrderStatusService';
import { formatPriceToVND, timestampsToDate, timestampsToDatetime } from '~/utils/utils';
import './Orders.scss';


const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [rows, setRows] = useState([]);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [order, setOrder] = useState();
  const [orderDetails, setOrderDetails] = useState([]);


  useEffect(() => {
    const fetchOrders = async () => {
      const [resOrders, resStatuses] = await Promise.all([
        OrderService.getOrdersByUserID(user.id, dispatch),
        OrderStatusService.getOrderStatuses({}, dispatch),
      ]);
      if (resOrders.status === 'OK' && resStatuses.status === 'OK') {
        const rowsData = resOrders.data.map((order) => {
          const { _id, orderID, createdAt, totalPrice, isPaid, status } = order;
          const statusName = resStatuses.data.find((st) => st.status === status).description;
          return {
            id: _id,
            orderID,
            orderTime: timestampsToDate(createdAt),
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

  const handleCloseModalDetails = () => {
    setOpenModalDetails(false);
  };

  const handleClickDetails = async (id) => {
    const orderID = rows.find((row) => row.id === id).orderID;
    const [res, resOrderDetails] = await Promise.all([
      OrderService.getOrder(id, dispatch),
      OrderDetailsService.getOrderDetails({ orderID }, dispatch),
    ]);
    if (res.status === 'OK' && resOrderDetails.status === 'OK') {
      setOrder(res.data);
      const rows = resOrderDetails.data.map((res, index) => {
        return {
          index: index + 1,
          id: res._id,
          image: res.image,
          name: res.name,
          variant: res.variant,
          quantity: res.quantity,
          price: res.price,
          totalPrice: res.quantity * res.price,
        };
      });
      setOrderDetails(rows);
    }
    setOpenModalDetails(true);
  };
  return (
    <div className='orders'>
      <DataTable
        rows={rows}
        head={['Mã đơn hàng', 'Ngày đặt', 'Tổng tiền', 'Trạng thái đơn hàng']}
        keys={['orderID', 'orderTime', 'totalPrice', 'status']}
        isDetails
        onClickDetails={handleClickDetails}
      />
      <ModalDialog open={openModalDetails} handleCancel={handleCloseModalDetails}>
        <div className='modal-order-details-user'>
          {/* <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Thông tin đơn hàng.</h2> */}
          <Box title='Thông tin đơn hàng'>
            <div className='order-details'>
              <div className='order-actions'></div>
              <div className='order-info'>
                <div className='order-info-left'>
                  <div className='order-info-field'>
                    <span>Mã đơn hàng:</span>
                    <span>Khách hàng:</span>
                    <span>Địa chỉ:</span>
                    <span>Tỉnh/thành phố:</span>
                    <span>Số điện thoại:</span>
                    <span>Email:</span>
                    <span>Ghi chú:</span>
                  </div>

                  <div className='order-info-value'>
                    <span>{order?.orderID}</span>
                    <span>{order?.fullName}</span>
                    <span>{order?.deliveryAddress}</span>
                    <span>{order?.deliveryProvince}</span>
                    <span>{order?.phone}</span>
                    <span>{order?.email}</span>
                    <span style={{ maxWidth: '400px' }}>{order?.note}</span>
                  </div>
                </div>

                <div className='order-info-right'>
                  <div className='order-info-field'>
                    <span>Người giao hàng:</span>
                    <span>Ngày lập đơn hàng:</span>
                    <span>Ngày nhận đơn hàng:</span>
                    <span>Nhận giao hàng lúc:</span>
                    <span>Thời điểm hoàn tất:</span>
                    <span>Phương thức thanh toán:</span>
                    <span>Trạng thái thanh toán:</span>
                    <span>Trạng thái đơn hàng:</span>
                  </div>

                  <div className='order-info-value'>
                    <span>{order?.shipper}</span>
                    <span>{order?.orderTime ? timestampsToDatetime(order?.orderTime) : ''}</span>
                    <span>{order?.acceptTime ? timestampsToDatetime(order?.acceptTime) : ''}</span>
                    <span>
                      {order?.shippedTime ? timestampsToDatetime(order?.shippedTime) : ''}
                    </span>
                    <span>
                      {order?.finishedTime ? timestampsToDatetime(order?.finishedTime) : ''}
                    </span>
                    <span>{order?.paymentMethod}</span>
                    <span>{order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
                    <span>{order?.statusDesc}</span>
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <Box title='Danh sách các mặt hàng thuộc đơn hàng'>
            <DataTable
              rows={orderDetails}
              head={['STT', 'Ảnh', 'Tên hàng', 'Biến thể', 'Số lượng', 'Giá', 'Thành tiền']}
              keys={['index', 'image', 'name', 'variant', 'quantity', 'price', 'totalPrice']}
            />
            <div className='total-price'>
              <span className='order-total-price'>
                Tổng tiền: {formatPriceToVND(order?.totalPrice)}
              </span>
              <span>Phí ship: {formatPriceToVND(order?.shippingPrice)}</span>
            </div>
          </Box>
        </div>
      </ModalDialog>
    </div>
  );
};

export default Orders;
