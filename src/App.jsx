import { jwtDecode } from 'jwt-decode';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { axiosJWT } from './api/apiConfig';
import DefaultLayout from './layouts/DefaultLayout';
import NotFound from './pages/NotFound/NotFound';
import { resetToast } from './redux/slides/ToastSlide';
import { resetUser, updateUser } from './redux/slides/UserSlide';
import { privateRoutes, publicRoutes } from './routes';
import UserService from './services/UserService';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(resetToast());
    const { decoded, accessToken } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDecoded = () => {
    let accessToken = user?.accessToken || localStorage.getItem('access_token');
    let decoded = {};
    if (accessToken) {
      // if (typeof accessToken === 'string') accessToken = JSON.parse(accessToken);
      decoded = jwtDecode(accessToken);
    }
    return { decoded, accessToken };
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      let storageRefreshToken = localStorage.getItem('refresh_token');
      const refreshToken = JSON.parse(storageRefreshToken);
      const decodedRefreshToken = jwtDecode(refreshToken);
      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken);
          config.headers['Authorization'] = `Bearer ${data?.access_token}`;
          localStorage.setItem('access_token', JSON.stringify(data?.access_token));
          dispatch(updateUser({ ...user, accessToken: data?.access_token }));
        } else {
          localStorage.clear();
          dispatch(resetUser());
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  // UserService.axiosInstance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (!error.response) {
  //       dispatch(setLoading(false));
  //       dispatch(
  //         updateToast({ status: 'failure', title: 'Thất bại', message: 'Lỗi kết nối mạng!' })
  //       );
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  const handleGetDetailsUser = async (id) => {
    let storageRefreshToken = localStorage.getItem('refresh_token');
    const refreshToken = JSON.parse(storageRefreshToken);
    const res = await UserService.getDetailsUser(id);
    dispatch(updateUser({ ...res?.data, refreshToken }));
  };

  return (
    <div className='app'>
      <Routes>
        <Route
          path='*'
          element={
            <DefaultLayout>
              <NotFound />
            </DefaultLayout>
          }
        />
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {user?.isAdmin &&
          privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
      </Routes>
    </div>
  );
}

export default App;
