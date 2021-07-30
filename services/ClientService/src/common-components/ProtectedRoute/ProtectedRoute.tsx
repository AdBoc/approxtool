import React from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';
import { token } from '../../utils/token';

export const ProtectedRoute: React.FC<{ [x: string]: any }> = ({children, ...rest}) => {
  return !token.accessToken ? <Redirect to="/login"/> : <Route {...rest}>{children}</Route>;
}
