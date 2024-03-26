import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import FormSearch from '~/components/Admin/FormSearch/FormSearch';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import TextQuantity from '~/components/Admin/TextQuantity/TextQuantity';
import Button from '~/components/Button/Button';
import DataTable from '~/components/DataTable/DataTable';
import ModalDialog from '~/components/ModalDialog/ModalDialog';
import Pagination from '~/components/Pagination/Pagination';
import { useDebounce } from '~/hooks/useDebounce';
import { setLoading } from '~/redux/slides/LoadingSlider';
import { updateToast } from '~/redux/slides/ToastSlide';
import SupplierService from '~/services/SupplierService';
import './ShowSupplier.scss';

const ShowSupplier = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [response, setResponse] = useState({});
  const [rows, setRows] = useState([]);
  const [keys, setKeys] = useState([]);
  const [head] = useState([
    'Tên nhà cung cấp',
    'Tên liên hệ',
    'Số điện thoại',
    'Email',
    'Địa chỉ',
    'Tỉnh/thành',
  ]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const user = useSelector((state) => state.user);

  const searchDebounce = useDebounce(search, 1000);
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async (payload) => {
    try {
      dispatch(setLoading(true));
      const res = await SupplierService.getSuppliers(payload, user.accessToken);
      if (res) {
        dispatch(setLoading(false));
        setResponse(res);
        const rows = res.data.map((e) => {
          return {
            id: e._id,
            name: e.name,
            contactName: e.contactName,
            phone: e.phone,
            email: e.email,
            address: e.address,
            province: e.province,
          };
        });
        setRows(rows);
        if (rows.length) setKeys(Object.keys(rows[0]));
      }
    } catch (error) {
      dispatch(setLoading(false));
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

  const handleDeleteShipper = async () => {
    try {
      setOpen(false);
      dispatch(setLoading(true));
      const res = await SupplierService.deleteSupplier(id, user.accessToken);
      dispatch(setLoading(false));
      dispatch(
        updateToast({
          status: 'ok',
          message: res.message,
        })
      );
      const newRows = rows.filter((row) => row.id !== res.data._id);
      setRows(newRows);
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='shippers'>
      <HeadingBreadCrumb>Quản lý nhà cung cấp</HeadingBreadCrumb>
      <Box>
        <div className='shippers-head'>
          <FormSearch
            placeholder='Nhập tên nhà cung cấp cần tìm kiếm'
            value={search}
            handleOnChange={handleOnChangeSearch}
            disabled={!searchDebounce}
          />
          <Button secondary type='a' className='btn-add' to='/admin/suppliers/add'>
            Bổ sung
          </Button>
        </div>
        <TextQuantity
          quantity={response.totalSuppliers ?? 0}
          text='nhà cung cấp'
          totalPage={response.totalPage ?? 0}
          page={page}
          pageSize={response.limit ?? 0}
        />

        <DataTable rows={rows} head={head} keys={keys} handleOpenDelete={handleOpenDelete} />
        <Pagination
          pageCount={response.totalPage ?? 0}
          onClickPageItem={(value) => setPage(value.selected + 1)}
        ></Pagination>
      </Box>
      <ModalDialog
        desc={'Bạn có muốn xoá nhà cung cấp này không ?'}
        handleClose={() => setOpen(false)}
        handleDelete={handleDeleteShipper}
        open={open}
      ></ModalDialog>
    </div>
  );
};

export default ShowSupplier;
