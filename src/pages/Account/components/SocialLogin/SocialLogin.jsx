import FacebookButton from '~/assets/imgs/fb-btn.svg';
import GooglePlusButton from '~/assets/imgs/gp-btn.svg';
import './SocialLogin.scss';

const SocialLogin = () => {
  return (
    <div className='social-login text-center'>
      <a href='' className='social-login--facebook'>
        <img src={FacebookButton} alt='' />
      </a>
      <a href='' className='social-login--googleplus'>
        <img src={GooglePlusButton} alt='' />
      </a>
    </div>
  );
};

export default SocialLogin;
