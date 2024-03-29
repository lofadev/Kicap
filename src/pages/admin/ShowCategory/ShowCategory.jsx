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
import CategoryService from '~/services/CategoryService';

const ShowCategory = () => {
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
    const res = await CategoryService.getCategorys(payload, user.accessToken, dispatch);
    if (res.status === 'OK') {
      const rows = res.data.map((category) => ({
        id: category._id,
        categoryName: category.categoryName,
        description: category.description,
      }));
      setRows(rows);
      setResponse(res);
      if (rows.length) setKeys(Object.keys(rows[0]));
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
    const res = await CategoryService.deleteCategory(id, user.accessToken, dispatch);
    if (res.status === 'OK') fetchData({ page, search: searchDebounce });
  };

  return (
    <div className='shippers'>
      <HeadingBreadCrumb>Quản lý danh mục sản phẩm</HeadingBreadCrumb>
      <Box>
        <div className='shippers-head'>
          <FormSearch
            placeholder='Nhập tên danh mục sản phẩm cần tìm kiếm'
            value={search}
            handleOnChange={handleOnChangeSearch}
            disabled={!searchDebounce}
          />
          <Button secondary className='btn-add' to='/admin/categorys/add'>
            Bổ sung
          </Button>
        </div>
        <TextQuantity
          quantity={response.totalCategories ?? 0}
          text='danh mục sản phẩm'
          totalPage={response.totalPage ?? 0}
          page={page}
          pageSize={response.limit ?? 0}
        />

        <DataTable
          rows={rows}
          head={['Tên danh mục sản phẩm', 'Mô tả']}
          keys={keys}
          handleOpenDelete={handleOpenDelete}
        />
        <Pagination
          pageCount={response.totalPage ?? 0}
          onClickPageItem={(value) => setPage(value.selected + 1)}
        ></Pagination>
      </Box>
      <ModalDialog
        desc={'Bạn có muốn xoá danh mục sản phẩm này không ?'}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        open={open}
      ></ModalDialog>
    </div>
  );
};

export default ShowCategory;
