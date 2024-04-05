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
import ProductService from '~/services/ProductService';

const ShowProduct = () => {
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
    const res = await ProductService.getProducts(payload, dispatch);
    if (res.status === 'OK') {
      setResponse(res);
      const rows = res.data.map((product) => ({
        id: product._id,
        image: product.image,
        name: product.name,
        phone: product.phone,
        email: product.email,
        address: product.address,
        province: product.province,
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
    const res = await ProductService.deleteProduct(id, dispatch);
    console.log(res);
    if (res.status === 'OK') fetchData({ page, search: searchDebounce });
  };

  return (
    <div className='products'>
      <HeadingBreadCrumb>Quản lý sản phẩm</HeadingBreadCrumb>
      <Box title='Danh sách sản phẩm'>
        <div className='search-head'>
          <FormSearch
            placeholder='Nhập tên sản phẩm cần tìm kiếm'
            value={search}
            handleOnChange={handleOnChangeSearch}
            disabled={!searchDebounce}
          />
          <Button secondary className='btn-add' to='/admin/product/add'>
            Bổ sung
          </Button>
        </div>
        <TextQuantity
          quantity={response.totalSuppliers ?? 0}
          text='sản phẩm'
          totalPage={response.totalPage ?? 0}
          page={page}
          pageSize={response.limit ?? 0}
        />

        <DataTable
          rows={rows}
          head={['Ảnh', 'Tên sản phẩm', 'Số điện thoại', 'Email', 'Địa chỉ', 'Tỉnh/thành phố']}
          keys={['image', 'name', 'phone', 'email', 'address', 'province']}
          handleOpenDelete={handleOpenDelete}
          updateTo={'product'}
        />
        <Pagination
          pageCount={response.totalPage ?? 0}
          onClickPageItem={(value) => setPage(value.selected + 1)}
        ></Pagination>
      </Box>
      <ModalDialog
        desc={'Bạn có muốn xoá sản phẩm này không ?'}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        open={open}
      ></ModalDialog>
    </div>
  );
};

export default ShowProduct;
