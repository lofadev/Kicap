import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import ProvinceService from '~/services/ProvinceService';
import SupplierService from '~/services/SupplierService';
import { supplierSchema } from '~/validate/YupSchema';

const UpdateSupplier = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      contactName: '',
      phone: '',
      email: '',
      address: '',
      province: '',
    },
    validationSchema: supplierSchema,
    onSubmit: async (payload) => {
      await SupplierService.updateSupplier(id, payload, dispatch);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const [provinceRes, supplierRes] = await Promise.all([
        ProvinceService.getProvinces(),
        SupplierService.getSupplier(id, dispatch),
      ]);
      if (provinceRes.status === 'OK') {
        const options = provinceRes.data.map((province) => {
          return {
            id: province.provinceId,
            name: province.provinceName,
          };
        });
        setOptions(options);
      }
      if (supplierRes.status === 'OK') {
        const supplier = supplierRes.data;
        formik.setValues({
          name: supplier.name,
          contactName: supplier.contactName,
          phone: supplier.phone,
          email: supplier.email,
          address: supplier.address,
          province: supplier.province,
        });
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeadingBreadCrumb>Cập nhật thông tin nhà cung cấp</HeadingBreadCrumb>

      <Box title='Thông tin nhà cung cấp'>
        <form>
          <Input
            labelName='Tên nhà cung cấp'
            placeholder='Nhập tên nhà cung cấp'
            required
            name='name'
            formik={formik}
          />
          <Input
            labelName='Tên liên hệ'
            placeholder='Nhập tên liên hệ'
            required
            name='contactName'
            formik={formik}
          />
          <Input
            labelName='Số điện thoại'
            placeholder='Nhập số điện thoại nhà cung cấp'
            required
            name='phone'
            formik={formik}
          />
          <Input
            labelName='Email'
            placeholder='Nhập email nhà cung cấp'
            required
            name='email'
            formik={formik}
          />
          <Input
            labelName='Địa chỉ'
            placeholder='Nhập địa chỉ nhà cung cấp'
            required
            name='address'
            formik={formik}
          />
          <SelectOptions
            labelName='Tỉnh/thành'
            required
            options={options}
            optionDefault='--- Chọn Tỉnh/thành ---'
            name='province'
            formik={formik}
            value='name'
          ></SelectOptions>

          <ButtonAction to='/admin/suppliers' handleSave={formik.handleSubmit} />
        </form>
      </Box>
    </div>
  );
};

export default UpdateSupplier;
