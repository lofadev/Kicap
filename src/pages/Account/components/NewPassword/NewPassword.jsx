import { useFormik } from 'formik';
import Button from '~/components/Button/Button';
import Input from '~/components/FormGroup/Input/Input';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import './NewPassword.scss';

const NewPassword = () => {
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });
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
          />
          <Input
            labelName='Xác nhận mật khẩu mới'
            placeholder='Nhập lại mật khẩu mới'
            name='confirmPassword'
            required
            formik={formik}
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
