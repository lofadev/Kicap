import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import SelectOptions from '~/components/Select/Select';
import ProvinceService from '~/services/ProvinceService';
import UserService from '~/services/UserService';
import { addCustomerSchema } from '~/validate/YupSchema';

const UpdateCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [optionsLocked] = useState([
    {
      id: 1,
      name: 'Không',
      value: 0,
    },
    {
      id: 2,
      name: 'Có',
      value: 1,
    },
  ]);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      province: '',
      isLocked: false,
    },
    validationSchema: addCustomerSchema,
    onSubmit: async (payload) => {
      await UserService.updateUser(id, payload, dispatch);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const [provinceRes, customerRes] = await Promise.all([
        ProvinceService.getProvinces(),
        UserService.getDetailsUser(id, dispatch),
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
      const customer = customerRes.data;
      formik.setValues({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        province: customer.province,
        isLocked: customer.isLocked,
      });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeadingBreadCrumb>Cập nhật thông tin khách hàng</HeadingBreadCrumb>

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
            required
            options={options}
            optionDefault='--- Chọn Tỉnh/thành ---'
            name='province'
            formik={formik}
            value='name'
          ></SelectOptions>
          <SelectOptions
            labelName='Trạng thái khoá'
            required
            options={optionsLocked}
            name='isLocked'
            formik={formik}
            value='value'
          ></SelectOptions>

          <ButtonAction to='/admin/customers' handleSave={formik.handleSubmit} />
        </form>
      </Box>
    </div>
  );
};

export default UpdateCustomer;
