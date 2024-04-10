import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import './AddOrder.scss';
import FormSearch from '~/components/Admin/FormSearch/FormSearch';
import { useState } from 'react';
import DataTable from '~/components/DataTable/DataTable';

const AddOrder = () => {
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState('');

  const handleChangeInputSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log(inputSearch);
  };

  return (
    <div className='add-order'>
      <HeadingBreadCrumb>Lập đơn hàng</HeadingBreadCrumb>
      <Box title='Thông tin đơn hàng'>
        <div className='add-order-main'>
          <div className='products'>
            <h2>Lựa chọn mặt hàng cần bán</h2>
            <FormSearch
              placeholder={'Nhập tên sản phẩm cần tìm'}
              value={inputSearch}
              handleOnChange={handleChangeInputSearch}
              handleSearch={handleSearch}
            ></FormSearch>
          </div>
          <div className='cart'>
            <div className='cart-list'>
              <h2>Danh sách mặt hàng đã chọn</h2>
              <DataTable
                head={['STT', 'Tên sản phẩm', 'Số lượng', 'Giá', 'Thành tiền']}
                rows={[]}
                isOrder
                keys={['index', 'productName', 'quantity', 'price', 'totalPrice']}
              ></DataTable>
            </div>

            <div className='order-info'></div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default AddOrder;
