import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  if (user.isAdmin) navigate('/admin/dashboard');
};

export default Admin;
