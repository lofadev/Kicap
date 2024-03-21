import { useEffect, useState } from 'react';
import FormSearch from '~/components/Admin/FormSearch/FormSearch';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Button from '~/components/Button/Button';
import { useDebounce } from '~/hooks/useDebounce';
import './ShowShipper.scss';
import Box from '~/components/Admin/Box/Box';
import TextQuantity from '~/components/Admin/TextQuantity/TextQuantity';
import DataTable from '~/components/DataTable/DataTable';
import Pagination from '~/components/Pagination/Pagination';

const ShowShipper = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const searchDebounce = useDebounce(search, 500);
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  const handleSubmitSearch = () => {
    alert(search);
  };

  return (
    <div className='shippers'>
      <HeadingBreadCrumb>Quản lý người giao hàng</HeadingBreadCrumb>
      <Box>
        <div className='shippers-head'>
          <FormSearch
            placeholder='Nhập tên người giao hàng cần tìm kiếm'
            value={search}
            handleOnChange={handleOnChangeSearch}
            handleSearch={handleSubmitSearch}
            disabled={!searchDebounce}
          />
          <Button secondary type='a' className='btn-add' to='/admin/shipper/add'>
            Bổ sung
          </Button>
        </div>
        <TextQuantity quantity={10} text='người giao hàng' totalPage={100} page={1} pageSize={10} />

        <DataTable />
        <Pagination
          pageCount={5}
          onClickPageItem={(value) => setPage(value.selected + 1)}
        ></Pagination>
      </Box>
    </div>
  );
};

export default ShowShipper;
