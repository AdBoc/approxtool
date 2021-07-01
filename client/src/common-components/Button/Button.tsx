import React from 'react';
import styles from './styles.module.scss';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  text: string;
}

export const Button: React.FC<Props> = ({text, className, ...props}): JSX.Element => (
  <button className={`${styles.button} ${className}`} {...props}>{text}</button>
);