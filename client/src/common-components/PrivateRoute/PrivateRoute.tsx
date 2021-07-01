import React from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';

export const PrivateRoute: React.FC<{ [x: string]: any }> = ({children, ...rest}) => {
  const accessToken = localStorage.getItem('token');
  if (!accessToken) return <Redirect to="/login"/>;
  return <Route {...rest}>{children}</Route>;
}
