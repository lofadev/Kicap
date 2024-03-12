import Button from '~/components/Button/Button';
import FormGroup from '~/components/FormGroup/FormGroup';
import './Login.scss';

const Login = () => {
  return (
    <div className='main-login'>
      <div className='content'>
        <div>
          <h1>Đăng nhập</h1>

          <FormGroup
            labelName='Tên đăng nhập'
            required
            placeholder='Nhập tên đăng nhập...'
            type='input'
            labelFor='username'
            autoFocus
          ></FormGroup>
          <FormGroup
            labelName='Mật khẩu'
            required
            placeholder='Nhập mật khẩu...'
            type='input'
            labelFor='password'
          ></FormGroup>
        </div>

        <a>
          <Button primary type='button' className='d-block w-full'>
            Đăng nhập
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Login;
