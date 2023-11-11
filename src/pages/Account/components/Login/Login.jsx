import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import FormGroup from '~/components/FormGroup/FormGroup';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Login.scss';

const Login = () => {
  useEffect(() => {
    document.title = 'Đăng nhập tài khoản | Kicap';
  }, []);

  return (
    <section className='section-login'>
      <SectionBreadCrumb child='Đăng nhập tài khoản'></SectionBreadCrumb>
      <div className='container mt-30'>
        <div className='account-main'>
          <h1 className='title-head text-center mb-30'>Đăng nhập tài khoản</h1>

          <SocialLogin />

          <form action='/account/login' method='post'>
            <FormGroup
              type='input'
              labelFor='login-email'
              labelName='Email'
              required
              placeholder='Nhập địa chỉ email'
            />
            <FormGroup
              type='input'
              typeInput='password'
              labelFor='login-password'
              labelName='Mật khẩu'
              required
              placeholder='Nhập mật khẩu'
            />
            <div className='text-center'>
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
