import { useFormik } from 'formik';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '~/components/Button/Button';
import Input from '~/components/FormGroup/Input/Input';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import { regex, validate } from '~/constant';
import { updateUser } from '~/redux/slides/UserSlide';
import UserService from '~/services/UserService';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Login.scss';

const schema = Yup.object().shape({
  email: Yup.string().required(validate.NOT_EMPTY).email(validate.INVALID_EMAIL),
  password: Yup.string()
    .required(validate.NOT_EMPTY)
    .matches(regex.password, validate.INVALID_PASSWORD),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (payload) => {
      const res = await UserService.loginUser(payload, dispatch);
      const data = res.data;
      navigate('/');
      localStorage.setItem('accessToken', JSON.stringify(data?.accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(data?.refreshToken));
      if (data?.accessToken) {
        const decoded = jwtDecode(data?.accessToken);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.accessToken);
        }
      }
    },
  });

  useEffect(() => {
    document.title = 'Đăng nhập tài khoản | Kicap';
  }, []);

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refreshToken');
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, token, dispatch);
    dispatch(updateUser({ ...res?.data, accessToken: token, refreshToken }));
  };

  return (
    <section className='section-login'>
      <SectionBreadCrumb child='Đăng nhập tài khoản'></SectionBreadCrumb>
      <div className='container mt-30'>
        <div className='account-main'>
          <h1 className='title-head text-center mb-30'>Đăng nhập tài khoản</h1>

          <SocialLogin />

          <form onSubmit={formik.handleSubmit}>
            <Input
              labelName='Email'
              placeholder='Nhập địa chỉ email'
              name='email'
              required
              formik={formik}
            />
            <Input
              labelName='Mật khẩu'
              placeholder='Nhập mật khẩu'
              name='password'
              required
              password
              formik={formik}
            />
            <div className='text-center'>
              <Button type='submit' primary className='btn-login'>
                Đăng nhập
              </Button>
            </div>
          </form>
          <p className='text-center'>
            <Link to='' className='btn-recover-password  text-color-primary'>
              Quên mật khẩu?
            </Link>
          </p>
          <div className='text-center'>
            <p className='text-login'>
              Bạn chưa có tài khoản. Đăng ký{' '}
              <Link className='text-color-primary' to='/account/register' title='Đăng ký'>
                tại đây.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
