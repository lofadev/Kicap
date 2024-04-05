import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import FormSearch from '~/components/Admin/FormSearch/FormSearch';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import TextQuantity from '~/components/Admin/TextQuantity/TextQuantity';
import Button from '~/components/Button/Button';
import DataTable from '~/components/DataTable/DataTable';
import ModalDialog from '~/components/ModalDialog/ModalDialog';
import Pagination from '~/components/Pagination/Pagination';
import { useDebounce } from '~/hooks/useDebounce';
import ShipperService from '~/services/ShipperService';

const ShowShipper = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState({});
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');

  const searchDebounce = useDebounce(searchInput, 500);
  const handleOnChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const fetchData = async (payload) => {
    const res = await ShipperService.getShippers(payload, dispatch);
    if (res.status === 'OK') {
      setResponse(res);
      const rows = res.data.map((e) => {
        return {
          id: e._id,
          name: e.name,
          phone: e.phone,
        };
      });
      setRows(rows);
    }
  };

  useEffect(() => {
    fetchData({ page, search: searchDebounce });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchDebounce]);

  const handleOpenDelete = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleDelete = async () => {
    setOpen(false);
    const res = await ShipperService.deleteShipper(id, dispatch);
    if (res.status === 'OK') fetchData({ page, search: searchDebounce });
  };

  const handleChangePage = (value) => {
    setPage(value.selected + 1);
  };

  return (
    <div className='shippers'>
      <HeadingBreadCrumb>Quản lý người giao hàng</HeadingBreadCrumb>
      <Box title='Danh sách người giao hàng'>
        <div className='search-head'>
          <FormSearch
            placeholder='Nhập tên người giao hàng cần tìm kiếm'
            value={searchInput}
            handleOnChange={handleOnChangeSearch}
            disabled={!searchDebounce}
            name='search'
          />
          <Button secondary className='btn-add' to='/admin/shipper/add'>
            Bổ sung
          </Button>
        </div>
        <TextQuantity
          quantity={response.totalShippers ?? 0}
          text='người giao hàng'
          totalPage={response.totalPage ?? 0}
          page={page}
          pageSize={response.limit ?? 0}
        />

        <DataTable
          rows={rows}
          head={['Tên người giao hàng', 'Số điện thoại']}
          keys={['name', 'phone']}
          handleOpenDelete={handleOpenDelete}
          updateTo='shipper'
        />
        <Pagination
          pageCount={response.totalPage ?? 0}
          onClickPageItem={handleChangePage}
        ></Pagination>
      </Box>
      <ModalDialog
        desc={'Bạn có muốn xoá người giao hàng này không ?'}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        open={open}
      ></ModalDialog>
    </div>
  );
};

export default ShowShipper;
