import { BaseSyntheticEvent, FC } from "react";
import styles from './styles.module.scss';

interface Props {
  value: number | '';
  onPaste: (e: any) => void;
  onChange: (e: BaseSyntheticEvent) => void;
};

export const Cell: FC<Props> = ({ value, onChange, onPaste }): JSX.Element =>
    <input className={styles.cell} type="number" value={value} onChange={onChange} onPaste={onPaste} onFocus={e => e.target.select()} />;
