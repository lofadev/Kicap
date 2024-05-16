import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './App.scss';
import { axiosJWT } from './api/apiConfig';
import { resetToast } from './redux/slices/ToastSlice';
import { resetUser, updateUser } from './redux/slices/UserSlice';
import AppRoutes from './routes/AppRoutes';
import UserService from './services/UserService';
import { getDecodedRfToken, getDecodedToken, getRfToken, getToken } from './utils/utils';

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetToast());
    const token = getToken();
    if (token && !user.accessToken) {
      const decoded = getDecodedToken();
      handleGetDetailsUser(decoded?.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const decodedAccessToken = getDecodedToken();
      if (decodedAccessToken?.exp < currentTime.getTime() / 1000) {
        const decodedRefreshToken = getDecodedRfToken();
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const refreshToken = getRfToken();
          const data = await UserService.refreshToken(refreshToken, dispatch);
          config.headers['Authorization'] = `Bearer ${data?.accessToken}`;
          localStorage.setItem('accessToken', JSON.stringify(data?.accessToken));
          dispatch(updateUser({ ...user, accessToken: data?.accessToken }));
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(resetUser());
          navigate('/account/login');
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  const handleGetDetailsUser = async (id) => {
    try {
      const refreshToken = getRfToken();
      const token = getToken();
      const res = await axiosJWT.get(`/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status === 'OK') {
        dispatch(updateUser({ ...res.data.data, accessToken: token, refreshToken }));
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(resetUser());
      navigate('/account/login');
    }
  };

  return (
    <div className='app'>
      <AppRoutes />
    </div>
  );
}

export default App;
