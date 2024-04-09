import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import ProvinceService from '~/services/ProvinceService';
import SupplierService from '~/services/SupplierService';
import { supplierSchema } from '~/validate/YupSchema';

const AddSupplier = () => {
  const dispatch = useDispatch();
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
    onSubmit: async (payload, { resetForm }) => {
      const res = await SupplierService.createSupplier(payload, dispatch);
      if (res.status === 'OK') resetForm();
    },
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await ProvinceService.getProvinces();
        if (res.status === 'OK') {
          const options = res.data.map((province) => {
            return {
              id: province.provinceId,
              name: province.provinceName,
            };
          });
          setOptions(options);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProvinces();
  }, []);

  return (
    <div>
      <HeadingBreadCrumb>Bổ sung nhà cung cấp</HeadingBreadCrumb>

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
            labelName='Tên giao dịch'
            placeholder='Nhập tên giao dịch'
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

export default AddSupplier;
