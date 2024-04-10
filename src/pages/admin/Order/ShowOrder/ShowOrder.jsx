import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import Box from '~/components/Admin/Box/Box';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import DatePickerValue from '~/components/DatePicker/DatePicker';
import './ShowOrder.scss';
import OrderStatusService from '~/services/OrderStatusService';
import { useDispatch } from 'react-redux';
import TextQuantity from '~/components/Admin/TextQuantity/TextQuantity';
import DataTable from '~/components/DataTable/DataTable';
import Pagination from '~/components/Pagination/Pagination';

const ShowOrder = () => {
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState({});
  const [rows, setRows] = useState([]);

  const handleChangeOrderStatus = (e) => {
    setOrderStatus(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await OrderStatusService.getOrderStatuses({}, dispatch);
      if (res.status === 'OK') {
        setOrderStatuses(res.data);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='show-order'>
      <HeadingBreadCrumb>Quản lý đơn đặt hàng</HeadingBreadCrumb>
      <Box title='Danh sách đơn đặt hàng'>
        <div className='order-status'>
          <FormControl fullWidth>
            <Select
              value={orderStatus}
              onChange={handleChangeOrderStatus}
              defaultValue={orderStatus}
            >
              <MenuItem value={0}>--- Trạng thái đơn hàng ---</MenuItem>
              {orderStatuses &&
                orderStatuses.map((orderStatus) => (
                  <MenuItem key={orderStatus._id} value={orderStatus.status}>
                    {orderStatus.description}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className='date-picker'>
          <span>Từ ngày</span>
          <DatePickerValue date={new Date().setMonth(new Date().getMonth() - 1)}></DatePickerValue>
          <span>Đến ngày</span>
          <DatePickerValue></DatePickerValue>
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
