import { useFormik } from 'formik';
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
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import { useDebounce } from '~/hooks/useDebounce';
import CategoryService from '~/services/CategoryService';
import ProductService from '~/services/ProductService';

const ShowProduct = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState({});
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [categories, setCategories] = useState([]);
  const searchDebounce = useDebounce(search, 1000);
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      category: '',
    },
  });

  const fetchData = async (payload) => {
    const [res, resCategory] = await Promise.all([
      ProductService.getProducts(payload, dispatch),
      CategoryService.getCategorys({}, dispatch),
    ]);
    if (res.status === 'OK') {
      setResponse(res);
      const rows = res.data.map((product) => ({
        id: product._id,
        image: product.image,
        name: product.name,
        brand: product.brand,
        supplier: product.supplier,
        category: product.category,
        price: product.price,
      }));
      setRows(rows);
    }
    if (resCategory.status === 'OK') {
      const categories = resCategory.data.map((data) => {
        return {
          id: data._id,
          name: data.categoryName,
          value: data.categoryName,
        };
      });
      setCategories(categories);
    }
  };

  useEffect(() => {
    fetchData({ page, search: searchDebounce, category: formik.values.category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchDebounce, formik.values.category]);

  const handleOpenDelete = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleDelete = async () => {
    setOpen(false);
    const res = await ProductService.deleteProduct(id, dispatch);
    if (res.status === 'OK') fetchData({ page, search: searchDebounce });
  };

  return (
    <div className='products'>
      <HeadingBreadCrumb>Quản lý sản phẩm</HeadingBreadCrumb>
      <Box title='Danh sách sản phẩm'>
        <SelectOptions
          labelName={'Danh mục sản phẩm'}
          options={categories}
          formik={formik}
          name={'category'}
          optionDefault={'--- Chọn danh mục sản phẩm ---'}
          value='value'
        />
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
          quantity={response.totalProducts ?? 0}
          text='sản phẩm'
          totalPage={response.totalPage ?? 0}
          page={page}
          pageSize={response.limit ?? 0}
        />

        <DataTable
          rows={rows}
          head={['Ảnh', 'Tên sản phẩm', 'Thương hiệu', 'Loại sản phẩm', 'Nhà cung cấp', 'Giá']}
          keys={['image', 'name', 'brand', 'category', 'supplier', 'price']}
          handleOpenDelete={handleOpenDelete}
          updateTo={'product'}
          isActions
        />
        <Pagination
          pageCount={response.totalPage ?? 0}
          onClickPageItem={(value) => setPage(value.selected + 1)}
        ></Pagination>
      </Box>
      <ModalConfirm
        desc={'Bạn có muốn xoá sản phẩm này không ?'}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        open={open}
      ></ModalConfirm>
    </div>
  );
};

export default ShowProduct;
