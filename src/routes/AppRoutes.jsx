import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from '~/layouts/DefaultLayout';
import NotFound from '~/pages/NotFound/NotFound';
import { getToken } from '~/utils/utils';
import { adminRoutes, privateRoutes, publicRoutes } from './routes';

const AppRoutes = () => {
  const user = useSelector((state) => state.user);
  return (
    <Routes>
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

      {privateRoutes.map((route, index) => {
        const Page = route.component;
        let Layout = DefaultLayout;
        const token = getToken();

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
                {token ? <Page /> : <Navigate to={'/account/login'} replace={true} />}
              </Layout>
            }
          />
        );
      })}

      {user?.isAdmin &&
        adminRoutes.map((route, index) => {
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
      <Route
        path='*'
        element={
          <DefaultLayout>
            <NotFound />
          </DefaultLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
