import React from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';
import { token } from '../../utils/token';

export const ProtectedRoute: React.FC<{ [x: string]: any }> = ({children, ...rest}) => {
  const accessToken = token.accessToken;
  if (!accessToken) return <Redirect to="/login"/>;
  return <Route {...rest}>{children}</Route>;
}
