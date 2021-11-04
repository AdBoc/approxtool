import React, { useState } from 'react';
import styles from './styles.module.scss';

interface Props {
  tooltipContent?: JSX.Element;
  className?: string;
}

export const Tooltip: React.FC<Props> = ({tooltipContent, className, children}): JSX.Element => {
  const [active, setActive] = useState(false);
  
  return (
    <div
      className={`${styles.tooltipWrapper} ${className ? className : null}`}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      {children}
      {active && (
        <div className={styles.tooltip}>
          {tooltipContent}
        </div>
      )}
    </div>
  );
};
