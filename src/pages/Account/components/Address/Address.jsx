import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Button from '~/components/Button/Button';
import Input from '~/components/FormGroup/Input/Input';
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import { updateUser } from '~/redux/slices/UserSlice';
import ProvinceService from '~/services/ProvinceService';
import UserService from '~/services/UserService';
import { validate } from '~/validate/constant';

const schema = yup.object().shape({
  address: yup.string().required(validate.NOT_EMPTY),
  province: yup.string().required(validate.NOT_EMPTY),
});

const Address = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [provinces, setProvices] = useState([]);
  const formik = useFormik({
    initialValues: {
      address: user.address,
      province: user.province,
    },
    validationSchema: schema,
    onSubmit: async (payload) => {
      const res = await UserService.updateUser(user.id, payload, dispatch);
      if (res.status === 'OK') {
        dispatch(updateUser({ ...user, address: res.data.address, provicne: res.data.province }));
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await ProvinceService.getProvinces({});
      if (res.status === 'OK') {
        const options = res.data.map((province) => {
          return {
            id: province.provinceId,
            name: province.provinceName,
          };
        });
        setProvices(options);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name='address'
          labelName='Địa chỉ'
          placeholder='Số nhà - đường - phường/xã - quận/huyện'
          formik={formik}
          required
        />
        <SelectOptions
          labelName='Tỉnh/thành phố'
          name='province'
          optionDefault={'--- Chọn tỉnh/thành phố ---'}
          formik={formik}
          options={provinces}
          value='name'
          required
        />

        <Button primary type='submit'>
          Cập nhật địa chỉ
        </Button>
      </form>
    </div>
  );
};

export default Address;
