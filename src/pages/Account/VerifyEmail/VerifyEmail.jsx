import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button/Button';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import useQuery from '~/hooks/useQuery';
import UserService from '~/services/UserService';
import './VerifyEmail.scss';

const VerifyEmail = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendVerifyEmail = async () => {
    const { email, token } = query;
    if (!email || !token) navigate('/');
    const res = await UserService.verifyEmail(query, dispatch);
    if (res.status === 'OK') navigate('/account/login');
  };

  useEffect(() => {
    handleSendVerifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='verify-email'>
      <SectionBreadCrumb child='Xác thực email' />
      <div className='container'>
        <div className='main-content'>
          <h2 className='title-head text-center mb-30'>Xác thực email</h2>

          <Button primary className='btn-send' onClick={handleSendVerifyEmail}>
            Gửi lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
