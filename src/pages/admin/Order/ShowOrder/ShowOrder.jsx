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

const ShowOrder = () => {
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderStatuses, setOrderStatuses] = useState([]);

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
      </Box>
    </div>
  );
};

export default ShowOrder;
