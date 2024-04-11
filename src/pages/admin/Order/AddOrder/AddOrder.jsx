import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import FormSearch from '~/components/Admin/FormSearch/FormSearch';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import DataTable from '~/components/DataTable/DataTable';
import ProductItem from '../components/ProductItem/ProductItem';
import './AddOrder.scss';

const AddOrder = () => {
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState('');
  const [cart, setCart] = useState([]);

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
            <div className='product-list'>
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
            </div>
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
