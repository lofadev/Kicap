import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import TextQuantity from '~/components/Admin/TextQuantity/TextQuantity';
import DataTable from '~/components/DataTable/DataTable';
import DatePickerValue from '~/components/DatePicker/DatePicker';
import Pagination from '~/components/Pagination/Pagination';
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import OrderService from '~/services/OrderService';
import OrderStatusService from '~/services/OrderStatusService';
import { timestampsToDate } from '~/utils/utils';
import './ShowOrder.scss';

const ShowOrder = () => {
  const dispatch = useDispatch();
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [rows, setRows] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs(new Date().setMonth(new Date().getMonth() - 1)));
  const [toDate, setToDate] = useState(dayjs(Date.now()));

  const formik = useFormik({
    initialValues: {
      status: '',
    },
  });

  // const fetchOrderStatuses = useCallback(async () => {
  //   const res = await OrderStatusService.getOrderStatuses({}, dispatch);
  //   if (res.status === 'OK') {
  //     const data = res.data.map((i) => {
  //       return {
  //         id: i._id,
  //         name: i.description,
  //         value: i.status,
  //       };
  //     });
  //     setOrderStatuses(data);
  //     return res.data;
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   fetchOrderStatuses();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const [res, resOrderStatuses] = await Promise.all([
        OrderService.getOrders(
          { status: formik.values.status, fromDate: fromDate.$d, toDate: toDate.$d, page },
          dispatch
        ),
        OrderStatusService.getOrderStatuses({}, dispatch),
      ]);
      if (res.status === 'OK' && resOrderStatuses.status === 'OK') {
        const orderStatuses = resOrderStatuses.data.map((i) => {
          return {
            id: i._id,
            name: i.description,
            value: i.status,
          };
        });
        setOrderStatuses(orderStatuses);
        const orders = res.data.map((order) => {
          const { _id, fullName, orderTime, shipper, totalPrice, isPaid, status, orderID } = order;
          const statusString = resOrderStatuses.data.find((st) => st.status === status).description;
          return {
            id: _id,
            orderID,
            fullName,
            orderTime: timestampsToDate(orderTime),
            shipper,
            totalPrice: totalPrice,
            isPaid: isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
            status: statusString,
          };
        });
        const pagination = res.pagination;
        setPagination(pagination);
        setRows(orders);
      }
    };

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, fromDate, toDate, formik.values.status]);

  return (
    <div className='show-order'>
      <HeadingBreadCrumb>Quản lý đơn đặt hàng</HeadingBreadCrumb>
      <Box title='Danh sách đơn đặt hàng'>
        <div className='order-status'>
          <SelectOptions
            labelName={'Trạng thái đơn hàng'}
            options={orderStatuses}
            formik={formik}
            name={'status'}
            optionDefault={'--- Chọn trạng thái đơn hàng ---'}
            value='value'
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className='date-picker'>
            <span style={{ textTransform: 'uppercase' }}>Ngày lập đơn hàng: </span>
            <span>Từ ngày</span>
            <DatePickerValue
              value={fromDate}
              onChange={(newFromDate) => setFromDate(newFromDate)}
            ></DatePickerValue>
            <span>Đến ngày</span>
            <DatePickerValue
              value={toDate}
              onChange={(newToDate) => setToDate(newToDate)}
            ></DatePickerValue>
          </div>
        </div>

        <TextQuantity
          quantity={pagination?.totalOrders ?? 0}
          text='đơn đặt hàng'
          totalPage={pagination?.totalPage ?? 0}
          page={page}
          pageSize={pagination?.limit ?? 0}
        />

        <DataTable
          rows={rows}
          head={[
            'Mã đơn hàng',
            'Khách hàng',
            'Ngày lập',
            'Người giao hàng',
            'Tổng tiền',
            'Trạng thái thanh toán',
            'Trạng thái đơn hàng',
          ]}
          keys={['orderID', 'fullName', 'orderTime', 'shipper', 'totalPrice', 'isPaid', 'status']}
          updateTo='order'
          isDetails
        />
        <Pagination
          pageCount={pagination?.totalPage ?? 0}
          onClickPageItem={(value) => setPage(value.selected + 1)}
        ></Pagination>
      </Box>
    </div>
  );
};

export default ShowOrder;
