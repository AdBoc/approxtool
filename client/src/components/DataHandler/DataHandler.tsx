import React, { BaseSyntheticEvent } from 'react';
import { readCSV } from './DataHandler.utils';
import { parseCSVText } from '../../utils/dataParsing';
import { Errors } from '../../constants/constants';
import { DataTable } from '../DataTable';
import { Button } from '../../common-components/Button/Button';
import {
  CurveFitActions,
  CurveFitState,
  FitActionType
} from '../../reducers/curveFitReducer';
import styles from './styles.module.scss';

interface Props {
  state: CurveFitState;
  dispatch: React.Dispatch<CurveFitActions>;
  toggleModal: () => void;
}

export const DataHandler: React.FC<Props> = ({state, dispatch, toggleModal}): JSX.Element => {
  const handleFileRead = async (e: BaseSyntheticEvent) => {
    const file = e.target.files as FileList;
    try {
      const result = await readCSV(file[0]);
      const parsedData = parseCSVText(result);
      dispatch({type: FitActionType.SET_PLOT_POINTS, plotPoints: parsedData});
    } catch (error) {
      if (error.message === Errors.ERR_CSV_EXT) console.error('Wrong file extension');
    }
  };

  const handlePointsReset = () => dispatch({type: FitActionType.SET_PLOT_POINTS, plotPoints: []});

  return (
    <div className={styles.dataHandlerWrapper}>
      <DataTable plotPoints={state.rawPoints} dispatch={dispatch}/>
      <div className={styles.buttonsWrapper}>
        <label className={styles.csvButton} htmlFor="file">Open CSV</label>
        <input id="file" type="file" accept="text/csv" name="csv reader" className={styles.fileInput}
               onChange={handleFileRead}/>
        <Button type="button" onClick={handlePointsReset} text="Clean"/>
        <Button text="Close" onClick={toggleModal}/>
      </div>
    </div>
  );
};

//TODO: DRAG AND DROP FILE
