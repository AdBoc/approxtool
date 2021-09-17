import React from 'react';
import {
  Redirect,
  Route,
  RouteProps
} from 'react-router-dom';
import { token } from '../../utils/token';
import { Navbar } from '../../components/Navbar';
import styles from './styles.module.scss';

export const ProtectedRoute: React.FC<RouteProps> = ({children, ...rest}) =>
  !token.accessToken
    ? <Redirect to="/login"/>
    : (
      <div className={styles.spacing}>
        <Navbar/>
        <Route {...rest}>{children}</Route>
      </div>
    );
