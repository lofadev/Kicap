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
import SupplierService from '~/services/SupplierService';
import './ShowSupplier.scss';

const ShowSupplier = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [response, setResponse] = useState({});
  const [rows, setRows] = useState([]);
  const [keys, setKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const user = useSelector((state) => state.user);

  const searchDebounce = useDebounce(search, 1000);
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async (payload) => {
    const res = await SupplierService.getSuppliers(payload, user.accessToken, dispatch);
    const rows = res.data.map((supplier) => ({
      id: supplier._id,
      name: supplier.name,
      contactName: supplier.contactName,
      phone: supplier.phone,
      email: supplier.email,
      address: supplier.address,
      province: supplier.province,
    }));
    setRows(rows);
    setResponse(res);
    if (rows.length) setKeys(Object.keys(rows[0]));
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
    const res = await SupplierService.deleteSupplier(id, user.accessToken, dispatch);
    if (res) fetchData({ page, search: searchDebounce });
  };

  return (
    <div className='suppliers'>
      <HeadingBreadCrumb>Quản lý nhà cung cấp</HeadingBreadCrumb>
      <Box title='Danh sách nhà cung cấp'>
        <div className='search-head'>
          <FormSearch
            placeholder='Nhập tên nhà cung cấp cần tìm kiếm'
            value={search}
            handleOnChange={handleOnChangeSearch}
            disabled={!searchDebounce}
          />
          <Button secondary className='btn-add' to='/admin/suppliers/add'>
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

        <DataTable
          rows={rows}
          head={[
            'Tên nhà cung cấp',
            'Tên liên hệ',
            'Số điện thoại',
            'Email',
            'Địa chỉ',
            'Tỉnh/thành phố',
          ]}
          keys={keys}
          handleOpenDelete={handleOpenDelete}
        />
        <Pagination
          pageCount={response.totalPage ?? 0}
          onClickPageItem={(value) => setPage(value.selected + 1)}
        ></Pagination>
      </Box>
      <ModalDialog
        desc={'Bạn có muốn xoá nhà cung cấp này không ?'}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        open={open}
      ></ModalDialog>
    </div>
  );
};

export default ShowSupplier;
