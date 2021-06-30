import React, {
  Dispatch,
  SetStateAction
} from 'react';
import styles from './styles.module.scss';
import { parsePasteText } from '../../utils/dataParsing';

interface Props {
  calculationData: number[];
  setCalculationData: Dispatch<SetStateAction<number[]>>;
}

export const DataTable: React.FC<Props> = ({calculationData, setCalculationData}): JSX.Element => {
  const handlePaste = (e: any) => {
    e.clipboardData.items[0].getAsString((text: string) => {
      console.log(text);
      const data = parsePasteText(text)
      setCalculationData(data);
    });
  };

  const handleChange = () => {

  };

  if (!calculationData.length) return (
    <div className={styles.sheetWrapper}>
      <div className={styles.row}>
        <span className={styles.numberCell}>1</span>
        <input className={styles.cell} type="number" onPaste={handlePaste} onChange={handleChange}/>
        <input className={styles.cell} type="number" onPaste={handlePaste} onChange={handleChange}/>
      </div>
    </div>
  )

  return (
    <div className={styles.sheetWrapper}>
      {calculationData.map((row, index) => (
        <div key={index} className={styles.row}>
          <span className={styles.numberCell}>{index}</span>
          <input className={styles.cell} type="number" onPaste={handlePaste}
                 value={calculationData[index]} onChange={handleChange}/>
          <input className={styles.cell} type="number" onPaste={handlePaste}
                 value={calculationData[index + 1]} onChange={handleChange}/>
        </div>
      ))}
      <div className={styles.row}>
        <span className={styles.numberCell}>{calculationData.length}</span>
        <input className={styles.cell} type="number" onPaste={handlePaste} value="" onChange={handleChange}/>
        <input className={styles.cell} type="number" onPaste={handlePaste} value="" onChange={handleChange}/>
      </div>
    </div>
  );
};