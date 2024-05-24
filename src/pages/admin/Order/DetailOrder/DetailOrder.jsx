import Box from '~/components/Admin/Box/Box';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import './DetailOrder.scss';
import { useEffect, useState } from 'react';
import OrderService from '~/services/OrderService';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OrderStatusService from '~/services/OrderStatusService';
import DataTable from '~/components/DataTable/DataTable';
import OrderDetailsService from '~/services/OrderDetailsService';
import { formatPriceToVND } from '~/utils/utils';

const DetailOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log(id);
    const fetchOrder = async () => {
      const [resOrder, resStatus] = await Promise.all([
        OrderService.getOrder(id, dispatch),
        OrderStatusService.getOrderStatuses({}, dispatch),
      ]);
      if (resOrder.status === 'OK') {
        const status = resStatus.data.find((st) => st.status === resOrder.data.status).description;
        const newOrder = { ...resOrder.data, status };
        setOrder(newOrder);
        const resOrderDetails = await OrderDetailsService.getOrderDetails(
          { orderID: resOrder.data.orderID },
          dispatch
        );
        if (resOrderDetails.status == 'OK') {
          const dataRows = resOrderDetails.data.map((item, index) => {
            const { image, name, price, variant, quantity, _id } = item;
            return {
              id: _id,
              index: index + 1,
              image,
              name,
              variant,
              quantity,
              price: formatPriceToVND(price),
              totalPrice: formatPriceToVND(price * quantity),
            };
          });
          setRows(dataRows);
        }
      }
    };

    fetchOrder();
  }, []);

  return (
    <div className='order-details'>
      <HeadingBreadCrumb>Chi tiết đơn hàng</HeadingBreadCrumb>

      <Box title='Thông tin đơn hàng'>
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
              <span>{order?.note}</span>
            </div>
          </div>

          <div className='order-info-right'>
            <div className='order-info-field'>
              <span>Người giao hàng:</span>
              <span>Ngày lập đơn hàng:</span>
              <span>Ngày nhận đơn hàng:</span>
              <span>Nhận giao hàng lúc:</span>
              <span>Thời điểm hoàn tất:</span>
              <span>Trạng thái thanh toán:</span>
              <span>Trạng thái đơn hàng:</span>
            </div>

            <div className='order-info-value'>
              <span>{order?.shipper}</span>
              <span>{order?.orderTime}</span>
              <span>{order?.acceptTime}</span>
              <span>{order?.shippedTime}</span>
              <span>{order?.finishedTime}</span>
              <span>{order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
              <span>{order?.status}</span>
            </div>
          </div>
        </div>
      </Box>
      <Box title='Danh sách các mặt hàng thuộc đơn hàng'>
        <DataTable
          rows={rows}
          head={['STT', 'Ảnh', 'Tên hàng', 'Biến thể', 'Số lượng', 'Giá', 'Thành tiền']}
          keys={['index', 'image', 'name', 'variant', 'quantity', 'price', 'totalPrice']}
          updateTo='order'
        />
      </Box>
    </div>
  );
};

export default DetailOrder;
