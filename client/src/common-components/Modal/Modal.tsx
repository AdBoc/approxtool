import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.scss';

interface Props {
  isShowing: boolean;
}

export const Modal: React.FC<Props> = ({children, isShowing}): JSX.Element | null =>
  isShowing ? ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          {children}
        </div>
      </div>
    </div>, document.body
  ) : null;
