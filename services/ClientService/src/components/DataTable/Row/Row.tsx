import { FC } from "react"
import styles from './styles.module.scss';

interface Props {
  rowNo: number;
}

export const Row: FC<Props> = ({ rowNo, children }): JSX.Element => {
  return (
    <div className={styles.row}>
      <div className={styles.label}>{rowNo}</div>
      {children}
    </div>
  )
};
