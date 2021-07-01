import React from 'react';
import styles from './styles.module.scss';

export const ErrorPage = () => {
  return (
    <div className={styles.errorWrapper}>
      <p className={styles.errorText}>Page does not exist</p>
    </div>
  );
};