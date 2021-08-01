import React from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom';
import { apiSrv } from '../../grpc-web';
import { LogoutRequest } from '../../protos/authservice_pb';
import { token } from '../../utils/token';
import styles from './styles.module.scss';

export const Navbar: React.FC = (): JSX.Element => {
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
    <div className={styles.navbar}>
      <Link to="/" className={`${styles.navbarElement} ${styles.mainLink}`}>Curve Fit</Link>
      <Link to="/model-manager" className={styles.navbarElement}>Manage models</Link>
      {token.decodedTokenData.user_role === 'ADMIN' &&
      <Link to="/user-manager" className={styles.navbarElement}>Manage Users</Link>}
      <button className={`${styles.navbarElement} ${styles.logoutButton}`} onClick={handleLogout}>Logout</button>
    </div>
  );
};
