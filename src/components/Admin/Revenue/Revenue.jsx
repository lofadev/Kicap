import SelectOptions from '~/components/SelectOptions/SelectOptions';
import './Revenue.scss';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import DashboardService from '~/services/DashboardService';
import { useDispatch } from 'react-redux';
import { formatPriceToVND } from '~/utils/utils';

const months = [
  {
    name: 'Tháng 1',
    value: 1,
    id: 1,
  },
  {
    name: 'Tháng 2',
    value: 2,
    id: 2,
  },
  {
    name: 'Tháng 3',
    value: 3,
    id: 3,
  },
  {
    name: 'Tháng 4',
    value: 4,
    id: 4,
  },
  {
    name: 'Tháng 5',
    value: 5,
    id: 5,
  },
  {
    name: 'Tháng 6',
    value: 6,
    id: 6,
  },
  {
    name: 'Tháng 7',
    value: 7,
    id: 7,
  },
  {
    name: 'Tháng 8',
    value: 8,
    id: 8,
  },
  {
    name: 'Tháng 9',
    value: 9,
    id: 9,
  },
  {
    name: 'Tháng 10',
    value: 10,
    id: 10,
  },
  {
    name: 'Tháng 11',
    value: 11,
    id: 11,
  },
  {
    name: 'Tháng 12',
    value: 12,
    id: 12,
  },
];

const years = [
  {
    id: 1,
    name: 'Năm 2020',
    value: 2020,
  },
  {
    id: 1,
    name: 'Năm 2021',
    value: 2021,
  },
  {
    id: 1,
    name: 'Năm 2022',
    value: 2022,
  },
  {
    id: 1,
    name: 'Năm 2023',
    value: 2023,
  },
  {
    id: 1,
    name: 'Năm 2024',
    value: 2024,
  },
];

const Revenue = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const { year, month } = formik.values;
      const fromDate = new Date(year, month, 1).toISOString();
      console.log(fromDate);
      const res = await DashboardService.getRevenue(
        { month: formik.values.month, year: formik.values.year },
        dispatch
      );
      if (res.status === 'OK') {
        console.log(res);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='revenue'>
      <h2 className='revenue-title'>Tổng doanh thu</h2>
      <div className='revenue-filter'>
        <SelectOptions
          labelName={'Tháng'}
          options={months}
          value='value'
          name='month'
          formik={formik}
        />
        <SelectOptions
          labelName={'Năm'}
          options={years}
          value='value'
          name='year'
          formik={formik}
        />
      </div>
      <h3 className='revenue-money'>{formatPriceToVND(0)}</h3>
    </div>
  );
};

export default Revenue;
