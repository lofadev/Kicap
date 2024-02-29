import { Fragment } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import DefaultLayout from './layouts/DefaultLayout';
import { privateRoutes, publicRoutes } from './routes';

function App() {
  const location = useLocation();

  return (
    <div className='app'>
      <Routes>
        {!location.pathname.includes('admin') &&
          publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                exact
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

        {location.pathname.includes('admin') &&
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
                exact
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
