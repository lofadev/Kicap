import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '~/components/Button/Button';
import Input from '~/components/FormGroup/Input/Input';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import { updateUser } from '~/redux/slices/UserSlice';
import UserService from '~/services/UserService';
import { getDecodedToken, getRfToken, getToken } from '~/utils/utils';
import { loginSchema } from '~/validate/YupSchema';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Login.scss';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (payload) => {
      const res = await UserService.loginUser(payload, dispatch);
      if (res.status === 'OK') {
        const data = res.data;
        localStorage.setItem('accessToken', JSON.stringify(data?.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(data?.refreshToken));
        const decoded = getDecodedToken();
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id);
        }
      }
    },
  });

  useEffect(() => {
    document.title = 'Đăng nhập tài khoản | Kicap';
    if (localStorage.getItem('accessToken')) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetDetailsUser = async (id) => {
    const res = await UserService.getDetailsUser(id, dispatch);
    if (res.status === 'OK') {
      const accessToken = getToken();
      const refreshToken = getRfToken();
      dispatch(updateUser({ ...res?.data, accessToken, refreshToken }));
      navigate('/');
    }
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
