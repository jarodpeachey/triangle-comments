import React, { Component, useContext } from 'react';
import { navigate } from 'gatsby';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { loggedIn } = useContext(AuthContext);

  if (!loggedIn && location.pathname !== `/login`) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }
  return <Component {...rest} />;
};
export default PrivateRoute;
