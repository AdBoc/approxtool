import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.scss';

interface Props {
  isShowing: boolean;
  className?: string;
  content?: JSX.Element;
}

export const Modal: React.FC<Props> = ({isShowing, className, children}): JSX.Element | null =>
  isShowing ? ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${className && className}`}>
        {children}
      </div>
    </div>, document.body
  ) : null;
