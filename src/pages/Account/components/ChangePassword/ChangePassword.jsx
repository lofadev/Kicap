import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Button from '~/components/Button/Button';
import Input from '~/components/FormGroup/Input/Input';
import { regex, validate } from '~/validate/constant';
import '../../Account.scss';
import UserService from '~/services/UserService';

const schema = yup.object().shape({
  oldPassword: yup.string().required(validate.NOT_EMPTY),
  newPassword: yup
    .string()
    .required(validate.NOT_EMPTY)
    .matches(regex.password, validate.INVALID_PASSWORD),
  confirmPassword: yup
    .string()
    .required(validate.NOT_EMPTY)
    .oneOf([yup.ref('newPassword'), null], validate.NOT_MATCH_PASSWORD),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: async (payload, { resetForm }) => {
      const res = UserService.changePassword(user.id, payload, dispatch);
      if (res.status === 'OK') resetForm();
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name='oldPassword'
          labelName='Mật khẩu cũ'
          placeholder='Nhập mật khẩu cũ'
          formik={formik}
          required
          password
        />
        <Input
          name='newPassword'
          labelName='Mật khẩu mới'
          placeholder='Nhập mật khẩu mới'
          formik={formik}
          required
          password
        />
        <Input
          name='confirmPassword'
          labelName='Xác nhận mật khẩu mới'
          placeholder='Nhập lại mật khẩu mới'
          formik={formik}
          required
          password
        />

        <Button primary type='submit'>
          Cập nhật mật khẩu
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
