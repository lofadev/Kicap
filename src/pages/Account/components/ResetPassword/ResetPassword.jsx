import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Button from '~/components/Button/Button';
import Input from '~/components/FormGroup/Input/Input';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import UserService from '~/services/UserService';
import { validate } from '~/validate/constant';
import './ResetPassword.scss';

const schema = yup.object().shape({
  email: yup.string().required(validate.NOT_EMPTY).email(validate.INVALID_EMAIL),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: true,
    validationSchema: schema,
    onSubmit: async (value) => {
      const res = await UserService.getPassword(value, dispatch);
      if (res) {
        console.log(res);
      }
    },
  });

  return (
    <div className='reset-password'>
      <SectionBreadCrumb child='Lấy lại mật khẩu' />
      <div className='container'>
        <h2 className='title-head text-center mb-30'>Lấy lại mật khẩu</h2>

        <form>
          <Input
            labelName='Email'
            placeholder='Nhập địa chỉ email'
            name='email'
            required
            formik={formik}
          />

          <Button primary className='btn-send' onClick={formik.handleSubmit}>
            Gửi
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
