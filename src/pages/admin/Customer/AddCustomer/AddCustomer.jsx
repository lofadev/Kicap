import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import ProvinceService from '~/services/ProvinceService';
import UserService from '~/services/UserService';
import { addCustomerSchema } from '~/validate/YupSchema';

const AddCustomer = () => {
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
    validationSchema: addCustomerSchema,
    onSubmit: async (payload) => {
      await UserService.registerUser(payload, dispatch);
    },
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await ProvinceService.getProvinces();
        if (res.status === 'OK') {
          const options = res.data.map((province) => ({
            id: province.provinceId,
            name: province.provinceName,
          }));
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
      <HeadingBreadCrumb>Bổ sung khách hàng</HeadingBreadCrumb>

      <Box title='Thông tin khách hàng'>
        <form>
          <Input
            labelName='Tên khách hàng'
            placeholder='Nhập tên khách hàng'
            required
            name='name'
            formik={formik}
          />
          <Input
            labelName='Số điện thoại'
            placeholder='Nhập số điện thoại khách hàng'
            required
            name='phone'
            formik={formik}
          />
          <Input
            labelName='Email'
            placeholder='Nhập email khách hàng'
            name='email'
            formik={formik}
          />
          <Input
            labelName='Địa chỉ'
            placeholder='Nhập địa chỉ khách hàng'
            required
            name='address'
            formik={formik}
          />
          <SelectOptions
            labelName='Tỉnh/thành'
            options={options}
            optionDefault='--- Chọn Tỉnh/thành ---'
            name='province'
            formik={formik}
            required
          ></SelectOptions>

          <ButtonAction to='/admin/customers' handleSave={formik.handleSubmit} />
        </form>
      </Box>
    </div>
  );
};

export default AddCustomer;
