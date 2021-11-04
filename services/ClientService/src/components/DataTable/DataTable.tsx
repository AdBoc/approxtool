import { BaseSyntheticEvent, Dispatch, FC } from 'react';
import styles from './styles.module.scss';
import {
  CurveFitActions, FitActionType,
} from '../../reducers/curveFitReducer';
import { Row } from './Row';
import { parsePasteText } from '../../utils/dataParsing';
import { Cell } from './Cell';

interface Props {
  plotPoints: number[];
  dispatch: Dispatch<CurveFitActions>;
}

function getNum(num: number) {
  let count = num / 2;
  if (!Number.isInteger(count)) count += 0.5;
  return count;
}

export const DataTable: FC<Props> = ({plotPoints, dispatch}): JSX.Element => {
  const pointsCount = plotPoints.length;
  
  const handlePaste = (e: any) => {
    e.clipboardData.items[0].getAsString((text: string) => {
      const data = parsePasteText(text);
      dispatch({ type: FitActionType.SET_PLOT_POINTS, plotPoints: data });
    });
  };

  const handleChange = (index: number) => (e: BaseSyntheticEvent) => {
    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) return;
    const newCalculationData = [...plotPoints];
    if (index >= pointsCount) newCalculationData.push(0, 0);
    newCalculationData[index] = newValue;
    dispatch({type: FitActionType.SET_PLOT_POINTS, plotPoints: newCalculationData});
  };

  const generateRows = () => {
    const rows: JSX.Element[] = [];
    for (let i = 0; i < pointsCount; i += 2) {
      rows.push(
        <Row key={i} rowNo={i/2}>
          <Cell value={plotPoints[i]} onChange={handleChange(i)} onPaste={handlePaste}/>
          <Cell value={plotPoints[i+1]} onChange={handleChange(i + 1)} onPaste={handlePaste}/>
        </Row>
      );
    }
    return rows;
  };

  return (
    <div className={styles.sheetWrapper}>
      {generateRows()}
      <Row rowNo={getNum(pointsCount)}>
        <Cell value={''} onChange={handleChange(pointsCount)} onPaste={handlePaste}/>
        <Cell value={''} onChange={handleChange(pointsCount + 1)} onPaste={handlePaste}/>
      </Row>
    </div>
  )
};
