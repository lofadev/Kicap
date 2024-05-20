import { useFormik } from 'formik';
import Button from '../Button/Button';
import Input from '../FormGroup/Input/Input';
import './FormComment.scss';

const FormComment = () => {
  const formik = useFormik({
    initialValues: {
      content: '',
      fullname: '',
      email: '',
    },
    onSubmit: async (payload) => {
      console.log(payload);
    },
  });
  return (
    <div className='article-comment'>
      <form action='submit' className='form-cmt'>
        <h5 className='form-title'>Viết bình luận của bạn</h5>
        <p className='form-note'>
          Địa chỉ email của bạn sẽ được bảo mật. Các trường bắt buộc được đánh dấu
          <span className='required'> *</span>
        </p>

        <div className='form-main'>
          <Input textarea labelName='Nội dung' required name='content' formik={formik}></Input>
          <div className='form-container'>
            <Input type='input' labelName='Họ tên' required name='fullname' formik={formik}></Input>
            <Input type='input' labelName='Email' required name='email' formik={formik}></Input>
          </div>
          <div className='clear'></div>
        </div>

        <div className='form-row'>
          <Button primary className='form-btn'>
            Gửi bình luận
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormComment;
