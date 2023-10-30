import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import FormGroup from '~/components/FormGroup/FormGroup';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Register.scss';

const Register = () => {
  useEffect(() => {
    document.title = 'Đăng ký tài khoản | Kicap';
  }, []);

  return (
    <div className='section-registor'>
      <SectionBreadCrumb child='Đăng ký tài khoản'></SectionBreadCrumb>
      <div className='container mt-30'>
        <div className='account-main'>
          <h1 className='title-head text-center'>Đăng ký tài khoản</h1>
          <p className='text-center mb-30'>Nếu chưa có tài khoản vui lòng đăng ký tại đây</p>
          <SocialLogin />

          <FormGroup
            type='input'
            labelFor='login-lastname'
            labelName='Họ'
            required
            placeholder='Nhập họ'
          />
          <FormGroup
            type='input'
            labelFor='login-firstname'
            labelName='Tên'
            required
            placeholder='Nhập tên'
          />
          <FormGroup
            type='input'
            labelFor='login-lastname'
            labelName='Số điện thoại'
            required
            placeholder='Nhập số điện thoại'
          />
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
            <Button type='button' primary className='btn-registor'>
              Tạo tài khoản
            </Button>
          </div>
          <p className='text-center'>
            <Link to='/account/login' className='btn-registor-login  text-color-primary'>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
