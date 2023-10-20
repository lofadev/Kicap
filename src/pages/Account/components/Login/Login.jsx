import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import './Login.scss';
import SocialLogin from '../SocialLogin/SocialLogin';
import FormGroup from '~/components/FormGroup/FormGroup';

const Login = () => {
  return (
    <>
      <SectionBreadCrumb child='Đăng nhập tài khoản'></SectionBreadCrumb>
      <div className='container mt-30'>
        <div className='account-main'>
          <h1 className='title-head text-center mb-30'>Đăng nhập tài khoản</h1>

          <SocialLogin />

          <FormGroup
            type='input'
            labelFor='login-email'
            labelName='Email'
            required
            placeholder='Nhập địa chỉ email'
          />
          <FormGroup
            type='input'
            labelFor='login-password'
            labelName='Mật khẩu'
            required
            placeholder='Nhập mật khẩu'
          />
        </div>
      </div>
    </>
  );
};

export default Login;
