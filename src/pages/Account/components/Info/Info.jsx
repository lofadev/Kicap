import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './info.scss';

const Info = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className='account-info'>
      <h5 className='title-account'>Thông tin tài khoản</h5>

      <p>
        <strong>Họ tên: </strong> <span>{user.name}</span>
      </p>
      <p>
        <strong>Email: </strong> <span>{user.email}</span>
      </p>
      {user.address && (
        <p>
          <strong>Địa chỉ: </strong>{' '}
          <span>
            {user.address}, {user.province}
          </span>
          <Link className='btn-edit-address' to={'/account/address'}>
            Sửa
          </Link>
        </p>
      )}
    </div>
  );
};

export default Info;
