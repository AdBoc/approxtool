import React from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom';
import styles from './styles.module.scss';

export const SideBar = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <div className={styles.sidebar}>
      <Link to="/model-manager" className={styles.sidebarElement}>
        Manage models
      </Link>
      <Link to="/user-manager" className={styles.sidebarElement}>
        Manage Users
      </Link>
      <button className={styles.sidebarElement} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

//TODO: LOGOUT MEMORY LEAK?