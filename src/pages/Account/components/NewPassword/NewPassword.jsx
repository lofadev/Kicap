import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '~/api/apiConfig';
import Button from '~/components/Button/Button';
import Input from '~/components/FormGroup/Input/Input';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import useQuery from '~/hooks/useQuery';
import { schemaResetPassword } from '~/validate/YupSchema';
import './NewPassword.scss';
import UserService from '~/services/UserService';
import { useDispatch } from 'react-redux';

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: schemaResetPassword,
    onSubmit: async (value) => {
      const { newPassword } = value;
      const { email, token } = query;
      const res = await UserService.resetPassword({ newPassword, email, token }, dispatch);
      if (res.status === 'OK') {
        navigate('/account/login');
      }
    },
  });

  useEffect(() => {
    const fetchCheck = async () => {
      if (!query.email || !query.token) navigate('/account/reset_password');
      try {
        await axiosInstance.post('/user/new-password-check', query);
      } catch (error) {
        navigate('/account/reset_password');
      }
    };

    fetchCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='new-password'>
      <SectionBreadCrumb child='Tạo mật khẩu mới' />
      <div className='container'>
        <h2 className='title-head text-center mb-30'>Tạo mật khẩu mới</h2>

        <form>
          <Input
            labelName='Mật khẩu mới'
            placeholder='Nhập mật khẩu mới'
            name='newPassword'
            required
            formik={formik}
            password
          />
          <Input
            labelName='Xác nhận mật khẩu mới'
            placeholder='Nhập lại mật khẩu mới'
            name='confirmPassword'
            required
            formik={formik}
            password
          />

          <Button primary className='btn-send' onClick={formik.handleSubmit}>
            Thay đổi mật khẩu
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
