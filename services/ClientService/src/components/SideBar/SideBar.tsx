import React from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom';
import { apiSrv } from '../../grpc-web';
import { LogoutRequest } from '../../protos/authservice_pb';
import { token } from '../../utils/token';
import styles from './styles.module.scss';

export const SideBar = (): JSX.Element => {
  const history = useHistory();

  const handleLogout = async () => {
    const request = new LogoutRequest();
    request.setAccessToken(token.accessToken);
    request.setRefreshToken(token.refreshToken);
    try {
      await apiSrv.logout(request, null);
      token.removeTokens();
      history.push('/login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.sidebar}>
      <Link to="/model-manager" className={styles.sidebarElement}>Manage models</Link>
      <Link to="/user-manager" className={styles.sidebarElement}>Manage Users</Link>
      <button className={styles.sidebarElement} onClick={handleLogout}>Logout</button>
    </div>
  );
};
