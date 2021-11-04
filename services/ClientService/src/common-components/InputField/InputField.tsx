import React, { BaseSyntheticEvent } from 'react';
import styles from './styles.module.scss';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  handler: (e: BaseSyntheticEvent) => void;
}

export const InputField: React.FC<Props> = ({ label, handler, ...props }): JSX.Element => (
  <label className={styles.label}>{label}
    <input className={styles.input} onChange={handler} {...props} />
  </label>
)
