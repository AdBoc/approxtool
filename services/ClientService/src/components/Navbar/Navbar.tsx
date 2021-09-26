import React from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom';
import { token } from '../../utils/token';
import styles from './styles.module.scss';

export const Navbar: React.FC = (): JSX.Element => {
  const history = useHistory();

  const handleLogout = async () => {
    token.removeTokens();
    history.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={`${styles.navbarElement} ${styles.mainLink}`}>Curve Fit</Link>
      <Link to="/model-manager" className={styles.navbarElement}>Manage models</Link>
      {token.decodedTokenData.user_role === 'ADMIN' &&
      <Link to="/user-manager" className={styles.navbarElement}>Manage Users</Link>}
      <button className={`${styles.navbarElement} ${styles.logoutButton}`} onClick={handleLogout}>Logout</button>
    </nav>
  );
};
