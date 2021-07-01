import React, { BaseSyntheticEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  key?: number;
  cellKey: number;
  calculationData: number[];
  handleChange: (e: BaseSyntheticEvent, i: number) => void;
  handleFocus: (e: BaseSyntheticEvent) => void;
  handlePaste: (e: BaseSyntheticEvent) => void;
  currentIterator: number;
}

export const Row: React.FC<Props> = (
  {
    key,
    cellKey,
    handleFocus,
    calculationData,
    handleChange,
    handlePaste,
    currentIterator
  }
): JSX.Element => {
  return (
    <div key={key} className={styles.row}>
      <span className={styles.numberCell}>{cellKey}</span>
      <input className={styles.cell} type="number" onPaste={handlePaste}
             value={calculationData[currentIterator]} onChange={(e) => handleChange(e, currentIterator)}
             onFocus={handleFocus}/>
      <input className={styles.cell} type="number" onPaste={handlePaste}
             value={calculationData[currentIterator + 1]} onChange={(e) => handleChange(e, currentIterator + 1)}
             onFocus={handleFocus}/>
    </div>
  );
};