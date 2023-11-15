import { Suspense } from "react";
import Loader from "@components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import { history } from "../../utils/history";
import { Route, Router, Switch } from "react-router-dom";
import config from "../../utils/config";
import React from "react";
import Layout from "@components/Layout/Layout";

const App = () => {
  const LoginPage = React.lazy(() => import("@view/Login/Login"));
  const PrivateRoute = React.lazy(() => import("../../routes/PrivateRoute"));
  const PrivateRoutes = React.lazy(() => import("../../routes/PrivateRoutes"));

  return (
    <>
      <Router history={history}>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path={config.routes.login} component={LoginPage} />
            <PrivateRoute location={config.routes.login}>
              <Route path="/">
                <Layout>
                  <PrivateRoutes />
                </Layout>
              </Route>
            </PrivateRoute>
          </Switch>
        </Suspense>
      </Router>

      <ToastContainer position="top-left" />
    </>
  );
};

export default App;
