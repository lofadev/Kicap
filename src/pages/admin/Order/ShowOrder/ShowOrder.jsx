import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import TextQuantity from '~/components/Admin/TextQuantity/TextQuantity';
import Button from '~/components/Button/Button';
import DataTable from '~/components/DataTable/DataTable';
import DatePickerValue from '~/components/DatePicker/DatePicker';
import Pagination from '~/components/Pagination/Pagination';
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import OrderStatusService from '~/services/OrderStatusService';
import { DatePickToISODate } from '~/utils/utils';
import './ShowOrder.scss';
import OrderService from '~/services/OrderService';

const ShowOrder = () => {
  const dispatch = useDispatch();
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState({});
  const [rows, setRows] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs(new Date().setMonth(new Date().getMonth() - 1)));
  const [toDate, setToDate] = useState(dayjs(Date.now()));

  const formik = useFormik({
    initialValues: {
      status: '',
    },
  });

  useEffect(() => {
    const fetchOrderStatuses = async () => {
      const res = await OrderStatusService.getOrderStatuses({}, dispatch);
      if (res.status === 'OK') {
        const data = res.data.map((i) => {
          return {
            id: i._id,
            name: i.description,
            value: i.status,
          };
        });
        setOrderStatuses(data);
      }
    };

    fetchOrderStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await OrderService.gerOrders(
        { status: formik.values.status, fromDate: fromDate.$d, toDate: toDate.$d },
        dispatch
      );
    };

    fetchOrders();
  }, []);

  const handleFilter = () => {
    console.log(DatePickToISODate(fromDate), DatePickToISODate(toDate), page, formik.values.status);
  };

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
          <Button secondary onClick={handleFilter}>
            Áp dụng
          </Button>
        </div>

        <TextQuantity
          quantity={response.totalShippers ?? 0}
          text='đơn đặt hàng'
          totalPage={response.totalPage ?? 0}
          page={page}
          pageSize={response.limit ?? 0}
        />

        <DataTable
          rows={rows}
          head={[
            'Khách hàng',
            'Ngày lập',
            'Thời điểm duyệt',
            'Người giao hàng',
            'Ngày nhận giao hàng',
            'Thời điểm kết thúc',
            'Trạng thái',
          ]}
          keys={['name', 'phone']}
          updateTo='shipper'
          isDetails
        />
        <Pagination
          pageCount={response.totalPage ?? 0}
          onClickPageItem={(value) => setPage(value.selected + 1)}
        ></Pagination>
      </Box>
    </div>
  );
};

export default ShowOrder;
