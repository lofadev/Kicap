import { jwtDecode } from 'jwt-decode';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import DefaultLayout from './layouts/DefaultLayout';
import NotFound from './pages/NotFound/NotFound';
import { resetUser, updateUser } from './redux/slides/UserSlide';
import { privateRoutes, publicRoutes } from './routes';
import UserService from './services/UserService';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const { accessToken, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDecoded = () => {
    let accessToken = user?.accessToken || localStorage.getItem('access_token');
    let decoded = {};
    if (accessToken && !user?.accessToken) {
      accessToken = JSON.parse(accessToken);
      decoded = jwtDecode(accessToken);
    }
    return { decoded, accessToken };
  };

  UserService.axiosJWT.interceptors.request.use(
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
          config.headers['token'] = `Bearer ${data?.access_token}`;
          localStorage.setItem('access_token', JSON.stringify(data?.access_token));
        } else {
          dispatch(resetUser());
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token');
    const refreshToken = JSON.parse(storageRefreshToken);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, accessToken: token, refreshToken }));
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
