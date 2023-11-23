import React from 'react';
import { Redirect } from 'react-router-dom';

import { isUserAuthenticated } from '../utils/auth';
import config from '../utils/config';

type Props = {
  children: React.ReactNode;
  location: string;
};

const PrivateRoute = ({ children, location }: Props) => {
  return (
    <>
      {isUserAuthenticated() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: config.routes.login,
            state: { from: location },
          }}
        />
      )}
    </>
  );
};

export default PrivateRoute;
