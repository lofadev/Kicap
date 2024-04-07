import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '~/components/Button/Button';
import Input from '~/components/FormGroup/Input/Input';
import { regex, validate } from '~/validate/constant';
import UserService from '~/services/UserService';
import './Login.scss';

const schema = Yup.object().shape({
  email: Yup.string().required(validate.NOT_EMPTY).email(validate.INVALID_EMAIL),
  password: Yup.string()
    .required(validate.NOT_EMPTY)
    .matches(regex.password, validate.INVALID_PASSWORD),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (payload, { setSubmitting, resetForm }) => {
      const res = await UserService.loginUser(payload);
      if (res.status === 'OK') {
        setSubmitting(false);
        resetForm();
      }
    },
  });

  return (
    <div className='main-login'>
      <div className='content'>
        <form onSubmit={formik.handleSubmit}>
          <h1>Đăng nhập</h1>

          <Input
            labelName='Email'
            placeholder='Nhập email...'
            required
            name='email'
            formik={formik}
          ></Input>
          <Input
            labelName='Mật khẩu'
            placeholder='Nhập mật khẩu...'
            required
            name='password'
            password
            formik={formik}
          ></Input>
          <Button secondary type='submit' className='d-block w-full' disabled={formik.isSubmitting}>
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
