import { useParams } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './Account.scss';

const Account = () => {
  const { type } = useParams();
  return (
    <div className='account'>
      {type == 'login' && <Login />}
      {type == 'register' && <Register />}
      {/* {type == 'login' && <Login />}
      {type == 'login' && <Login />}
      {type == 'login' && <Login />} */}
    </div>
  );
};

export default Account;
