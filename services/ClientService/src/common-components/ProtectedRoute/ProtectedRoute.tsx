import React from 'react';
import {
  Redirect,
  Route,
  RouteProps
} from 'react-router-dom';
import { token } from '../../utils/token';
import { Role } from '../../constants/role';
import { ROUTES } from '../../constants/routes';
import { Navbar } from '../../components/Navbar';
import styles from './styles.module.scss';

interface IProtectedRoute extends RouteProps {
  roles: Role[];
}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({children, roles, ...rest}) =>
  token.accessToken && roles.includes(token.decodedTokenData.user_role)
    ? (
      <div className={styles.spacing}>
        <Navbar/>
        <Route {...rest}>{children}</Route>
      </div>
    )
    : <Redirect to={ROUTES.login}/>;
