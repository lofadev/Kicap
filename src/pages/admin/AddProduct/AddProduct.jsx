import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import FormGroup from '~/components/FormGroup/FormGroup';
import Input from '~/components/FormGroup/Input/Input';
import InputFile from '~/components/FormGroup/InputFile/InputFile';
import InputNumber from '~/components/FormGroup/InputNumber/InputNumber';
import SelectOptions from '~/components/Select/Select';
import CategoryService from '~/services/CategoryService';
import SupplierService from '~/services/SupplierService';
import './AddProduct.scss';

const AddProduct = () => {
  const [value, setValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      name: '',
      decription: '',
      category: '',
      supplier: '',
      images: [],
      price: '',
      productAttribute: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesRes, suppliersRes] = await Promise.all([
        CategoryService.getCategorys({}, user.accessToken, dispatch),
        SupplierService.getSuppliers({}, user.accessToken, dispatch),
      ]);
      if (categoriesRes.status === 'OK') {
        const categories = categoriesRes.data.map((category) => {
          return {
            id: category._id,
            name: category.categoryName,
          };
        });
        setCategories(categories);
      }
      if (suppliersRes.status === 'OK') {
        const suppliers = suppliersRes.data.map((supplier) => {
          return {
            id: supplier._id,
            name: supplier.name,
          };
        });
        setSuppliers(suppliers);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='product-add'>
      <HeadingBreadCrumb>Bổ sung sản phẩm</HeadingBreadCrumb>

      <Box title='Thông tin sản phẩm'>
        <Input
          labelName='Tiêu đề'
          name='title'
          required
          formik={formik}
          placeholder='Nhập tiêu đề sản phẩm'
        />
        <SelectOptions
          labelName='Loại hàng'
          required
          options={categories}
          optionDefault='--- Chọn loại hàng ---'
          name='category'
          formik={formik}
          value='name'
        ></SelectOptions>
        <SelectOptions
          labelName='Nhà cung cấp'
          required
          options={suppliers}
          optionDefault='--- Chọn nhà cung cấp ---'
          name='supplier'
          formik={formik}
          value='name'
        ></SelectOptions>
        <InputFile
          labelName='Ảnh minh hoạ'
          name='images'
          required
          formik={formik}
          placeholder='Nhập tiêu đề sản phẩm'
          multiple
        />
        <FormGroup labelName='Mô tả' name='description'>
          <ReactQuill
            placeholder='Nhập mô tả sản phẩm'
            theme='snow'
            value={value}
            onChange={setValue}
          />
        </FormGroup>
        <SelectOptions
          labelName='Thuộc tính sản phẩm'
          required
          options={[
            {
              id: 1,
              value: false,
              name: 'Không',
            },
            {
              id: 2,
              value: true,
              name: 'Có',
            },
          ]}
          name='productAttribute'
          formik={formik}
        ></SelectOptions>

        {!formik.values.productAttribute && (
          <>
            <Input
              labelName='Thương hiệu'
              name='brand'
              required
              formik={formik}
              placeholder='Nhập thương hiệu của sản phẩm'
            />
            <InputNumber labelName='Số lượng' required formik={formik} name='quantity' />
            <InputNumber labelName='Giá' required formik={formik} name='price' />
          </>
        )}
      </Box>
    </div>
  );
};

export default AddProduct;
