import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button/Button';
import FormGroup from '~/components/FormGroup/FormGroup';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import { setLoading } from '~/redux/slides/LoadingSlider';
import { updateToast } from '~/redux/slides/ToastSlide';
import { updateUser } from '~/redux/slides/UserSlide';
import UserService from '~/services/UserService';
import { validatedEmail, validatedPassword } from '~/utils';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Login.scss';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Đăng nhập tài khoản | Kicap';
  }, []);

  const handleOnChangeInput = (e) => {
    let error;
    if (e.target.name === 'email') error = validatedEmail(e.target.value);
    else if (e.target.name === 'password') error = validatedPassword(e.target.value);
    setFormErrors({ ...formErrors, [e.target.name]: error });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidate = () => {
    const errorEmail = validatedEmail(formData.email);
    const errorPassword = validatedPassword(formData.password);
    setFormErrors({
      email: errorEmail ?? '',
      password: errorPassword ?? '',
    });
    if (errorEmail || errorPassword) return false;
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validated = handleValidate();
    if (validated) {
      try {
        dispatch(setLoading(true));
        const payload = {
          email: formData.email,
          password: formData.password,
        };
        const res = await UserService.loginUser(payload);
        dispatch(setLoading(false));
        dispatch(
          updateToast({
            status: 'ok',
            message: res.message,
          })
        );
        navigate('/');
        const data = res.data;
        localStorage.setItem('access_token', JSON.stringify(data?.access_token));
        localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
        if (data?.access_token) {
          const decoded = jwtDecode(data?.access_token);
          if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, data?.access_token);
          }
        }
      } catch (error) {
        const message = error.response.data.message;
        dispatch(
          updateToast({
            status: 'error',
            message,
          })
        );
        dispatch(setLoading(false));
      }
    }
  };

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token');
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, accessToken: token, refreshToken }));
  };

  return (
    <section className='section-login'>
      <SectionBreadCrumb child='Đăng nhập tài khoản'></SectionBreadCrumb>
      <div className='container mt-30'>
        <div className='account-main'>
          <h1 className='title-head text-center mb-30'>Đăng nhập tài khoản</h1>

          <SocialLogin />

          <form action='' method='post'>
            <FormGroup
              type='input'
              labelFor='login-email'
              labelName='Email'
              name='email'
              required
              placeholder='Nhập địa chỉ email'
              autoFocus
              valueInput={formData.email}
              handleOnChange={handleOnChangeInput}
              error={formErrors.email}
            />
            <FormGroup
              type='input'
              typeInput='password'
              labelFor='login-password'
              labelName='Mật khẩu'
              name='password'
              required
              eye
              password
              placeholder='Nhập mật khẩu'
              valueInput={formData.password}
              handleOnChange={handleOnChangeInput}
              error={formErrors.password}
            />
            <div className='text-center' onClick={handleLogin}>
              <Button type='button' primary className='btn-login'>
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
