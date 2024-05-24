import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import FormSearch from '~/components/Admin/FormSearch/FormSearch';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import TextQuantity from '~/components/Admin/TextQuantity/TextQuantity';
import Button from '~/components/Button/Button';
import DataTable from '~/components/DataTable/DataTable';
import ModalConfirm from '~/components/ModalConfirm/ModalConfirm';
import Pagination from '~/components/Pagination/Pagination';
import { useDebounce } from '~/hooks/useDebounce';
import CategoryService from '~/services/CategoryService';

const ShowCategory = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState({});
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');

  const searchDebounce = useDebounce(search, 1000);
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async (payload) => {
    const res = await CategoryService.getCategorys(payload, dispatch);
    if (res.status === 'OK') {
      setResponse(res);
      const rows = res.data.map((category) => ({
        id: category._id,
        categoryName: category.categoryName,
        description: category.description,
      }));
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
    const res = await CategoryService.deleteCategory(id, dispatch);
    if (res.status === 'OK') fetchData({ page, search: searchDebounce });
  };

  return (
    <div className='categories'>
      <HeadingBreadCrumb>Quản lý danh mục sản phẩm</HeadingBreadCrumb>
      <Box title='Danh sách danh mục sản phẩm'>
        <div className='search-head'>
          <FormSearch
            placeholder='Nhập tên danh mục sản phẩm cần tìm kiếm'
            value={search}
            handleOnChange={handleOnChangeSearch}
            disabled={!searchDebounce}
          />
          <Button secondary className='btn-add' to='/admin/category/add'>
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
          keys={['categoryName', 'description']}
          handleOpenDelete={handleOpenDelete}
          updateTo={'category'}
        />
        <Pagination
          pageCount={response.totalPage ?? 0}
          onClickPageItem={(value) => setPage(value.selected + 1)}
        ></Pagination>
      </Box>
      <ModalConfirm
        desc={'Bạn có muốn xoá danh mục sản phẩm này không ?'}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        open={open}
      ></ModalConfirm>
    </div>
  );
};

export default ShowCategory;
