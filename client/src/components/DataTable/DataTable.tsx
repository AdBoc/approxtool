import React, { BaseSyntheticEvent } from 'react';
import { parsePasteText } from '../../utils/dataParsing';
import styles from './styles.module.scss';
import {
  CurveFitActions,
  FitActionType
} from '../../reducers/curveFitReducer';

interface Props {
  plotPoints: number[];
  dispatch: React.Dispatch<CurveFitActions>;
}

export const DataTable: React.FC<Props> = ({plotPoints, dispatch}): JSX.Element => {
  const handlePaste = (e: any) => {
    e.clipboardData.items[0].getAsString((text: string) => {
      const data = parsePasteText(text);
      dispatch({type: FitActionType.SET_PLOT_POINTS, plotPoints: data});
    });
  };

  const handleFocus = (e: BaseSyntheticEvent) => e.target.select();

  const handleChange = (e: BaseSyntheticEvent, i: number, addNewRow = false) => {
    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) return;

    const newCalculationData = [...plotPoints];

    if (addNewRow) newCalculationData.push(0, 0);

    newCalculationData[i] = parseFloat(e.target.value);
    dispatch({type: FitActionType.SET_PLOT_POINTS, plotPoints: newCalculationData});
  };

  function generateData(calculationData: number[]) {
    let cells: JSX.Element[] = [];
    let cellKey = 1;

    for (let i = 0; i <= calculationData.length; i += 2) { //TODO: WHAT IF I DO calc.length - 1??
      cells.push(
        <div key={cellKey} className={styles.row}>
          <span className={styles.numberCell}>{cellKey}</span>
          <input className={styles.cell} type="number" onPaste={handlePaste}
                 value={calculationData[i]} onChange={(e) => handleChange(e, i)} onFocus={handleFocus}/>
          <input className={styles.cell} type="number" onPaste={handlePaste}
                 value={calculationData[i + 1]} onChange={(e) => handleChange(e, i + 1)} onFocus={handleFocus}/>
        </div>
      )
      cellKey++;
    }
    cells.pop();

    return cells;
  }

  if (!plotPoints.length) return (
    <div className={styles.sheetWrapper}>
      <div className={styles.row}>
        <span className={styles.numberCell}>1</span>
        <input className={styles.cell} type="number" onPaste={handlePaste} onChange={(e) => handleChange(e, 0, true)}/>
        <input className={styles.cell} type="number" onPaste={handlePaste} onChange={(e) => handleChange(e, 1, true)}/>
      </div>
    </div>
  );

  return (
    <div className={styles.sheetWrapper}>
      {generateData(plotPoints)}
      <div className={styles.row}>
        <span className={styles.numberCell}>{Math.floor((plotPoints.length / 2) + 1)}</span>
        <input className={styles.cell} type="number" onPaste={handlePaste} value=""
               onChange={(e) => handleChange(e, plotPoints.length, true)}/>
        <input className={styles.cell} type="number" onPaste={handlePaste} value=""
               onChange={(e) => handleChange(e, plotPoints.length + 1, true)}/>
      </div>
    </div>
  );
};

//TODO: PASTE FROM POSITION INDEX 5 FOR EXAMPLE
//TODO: CREATE ROW COMPONENT
//TODO: DATA SELECTION BY USER
//TODO: FIX BUG WITH ADDING NEW ROW
//TODO: REFACTOR
