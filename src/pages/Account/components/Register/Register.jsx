import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import FormGroup from '~/components/FormGroup/FormGroup';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import {
  validatedConfirmPassword,
  validatedEmail,
  validatedEmpty,
  validatedPassword,
  validatedPhoneNumber,
} from '~/utils';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Register.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    document.title = 'Đăng ký tài khoản | Kicap';
  }, []);

  const handleOnChangeInput = (e) => {
    let error;
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'name') error = validatedEmpty(value);
    else if (name === 'phone') error = validatedPhoneNumber(value);
    else if (name === 'email') error = validatedEmail(value);
    else if (name === 'password') error = validatedPassword(value);
    else if (name === 'confirmPassword') error = validatedConfirmPassword(formData.password, value);
    setFormErrors({ ...formErrors, [name]: error });
    setFormData({ ...formData, [name]: value });
  };

  const handleValidate = () => {
    const errorName = validatedEmpty(formData.name);
    const errorPhone = validatedPhoneNumber(formData.phone);
    const errorEmail = validatedEmail(formData.email);
    const errorPassword = validatedPassword(formData.password);
    const errorConfirmPassword = validatedConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    setFormErrors({
      name: errorName ?? '',
      phone: errorPhone ?? '',
      email: errorEmail ?? '',
      password: errorPassword ?? '',
      confirmPassword: errorConfirmPassword ?? '',
    });
    if (errorName || errorPhone || errorEmail || errorPassword || errorConfirmPassword)
      return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validated = handleValidate();
    if (validated) {
      // xử lý đăng ký
      console.log('xử lý đăng ký');
    }
  };

  return (
    <div className='section-registor'>
      <SectionBreadCrumb child='Đăng ký tài khoản'></SectionBreadCrumb>
      <div className='container mt-30'>
        <div className='account-main'>
          <h1 className='title-head text-center'>Đăng ký tài khoản</h1>
          <p className='text-center mb-30'>Nếu chưa có tài khoản vui lòng đăng ký tại đây</p>
          <SocialLogin />

          <form method='post'>
            <FormGroup
              type='input'
              labelFor='name'
              labelName='Tên'
              name='name'
              required
              placeholder='Nhập tên'
              autoFocus
              valueInput={formData.name}
              handleOnChange={handleOnChangeInput}
              error={formErrors.name}
            />
            <FormGroup
              type='input'
              labelFor='phone'
              labelName='Số điện thoại'
              name='phone'
              required
              placeholder='Nhập số điện thoại'
              valueInput={formData.phone}
              handleOnChange={handleOnChangeInput}
              error={formErrors.phone}
            />
            <FormGroup
              type='input'
              labelFor='email'
              labelName='Email'
              name='email'
              required
              placeholder='Nhập địa chỉ email'
              valueInput={formData.email}
              handleOnChange={handleOnChangeInput}
              error={formErrors.email}
            />
            <FormGroup
              type='input'
              password
              labelFor='password'
              labelName='Mật khẩu'
              name='password'
              required
              placeholder='Nhập mật khẩu'
              valueInput={formData.password}
              handleOnChange={handleOnChangeInput}
              error={formErrors.password}
              eye={true}
            />
            <FormGroup
              type='input'
              password
              labelFor='confirm-password'
              labelName='Xác nhận mật khẩu'
              name='confirmPassword'
              required
              placeholder='Nhập lại mật khẩu'
              valueInput={formData.confirmPassword}
              handleOnChange={handleOnChangeInput}
              error={formErrors.confirmPassword}
              eye={true}
            />

            <div className='text-center' onClick={handleSubmit}>
              <Button type='button' primary className='btn-registor'>
                Tạo tài khoản
              </Button>
            </div>
          </form>
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
