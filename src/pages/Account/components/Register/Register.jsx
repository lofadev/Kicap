import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button/Button';
import Input from '~/components/FormGroup/Input/Input';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import UserService from '~/services/UserService';
import { registerSchema } from '~/validate/YupSchema';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Register.scss';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (payload) => {
      const res = await UserService.registerUser(payload, dispatch);
      if (res.status === 'OK') {
        navigate('/account/login');
      }
    },
  });

  useEffect(() => {
    document.title = 'Đăng ký tài khoản | Kicap';
    if (localStorage.getItem('accessToken')) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='section-registor'>
      <SectionBreadCrumb child='Đăng ký tài khoản'></SectionBreadCrumb>
      <div className='container mt-30'>
        <div className='account-main'>
          <h1 className='title-head text-center'>Đăng ký tài khoản</h1>
          <p className='text-center mb-30'>Nếu chưa có tài khoản vui lòng đăng ký tại đây</p>
          <SocialLogin />

          <form>
            <Input
              labelName='Họ tên'
              placeholder='Nhập họ tên'
              name='name'
              required
              formik={formik}
            />
            <Input
              labelName='Số điện thoại'
              placeholder='Nhập số điện thoại'
              name='phone'
              required
              formik={formik}
            />
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
            <Input
              labelName='Xác nhận mật khẩu'
              placeholder='Nhập lại mật khẩu'
              name='confirmPassword'
              required
              password
              formik={formik}
            />

            <div className='text-center' onClick={formik.handleSubmit}>
              <Button primary type='submit' className='btn-registor'>
                Tạo tài khoản
              </Button>
            </div>
          </form>
          <p className='text-center'>
            <Link to='/account/login' className='btn-register-login  text-color-primary'>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
