import {
  BaseSyntheticEvent,
  FC,
  Dispatch
} from 'react';
import { readCSV } from './DataHandler.utils';
import {
  parseCSVText,
  parsePointsForGraph
} from '../../utils/dataParsing';
import { getXYAxisMinMax } from '../../utils/curveFit';
import { graphDataManager } from '../../utils/graphData';
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
  dispatch: Dispatch<CurveFitActions>;
  toggleModal: () => void;
}

export const DataHandler: FC<Props> = ({state, dispatch, toggleModal}): JSX.Element => {
  const handleFileRead = async (e: BaseSyntheticEvent) => {
    const file = e.target.files as FileList;
    try {
      const result = await readCSV(file[0]);
      const parsedData = parseCSVText(result);
      dispatch({type: FitActionType.SET_PLOT_POINTS, plotPoints: parsedData});
    } catch (error) {
      if (error instanceof Error && error.message === Errors.ERR_CSV_EXT) return console.error(Errors.ERR_CSV_EXT);
    }
  };

  const updateGraphPoints = () => {
    if (!state.rawPoints.length) return;
    const graphPoints = parsePointsForGraph(state.rawPoints);
    const [xMin, xMax, yMin, yMax] = getXYAxisMinMax(graphPoints);
    graphDataManager.setXMinMax(xMin, xMax);
    dispatch({type: FitActionType.RAW_POINTS_TO_GRAPH_POINTS, graphPoints});
    dispatch({type: FitActionType.SET_DOMAINS, xDomain: [xMin, xMax], yDomain: [yMin, yMax]});
  };

  const handlePointsReset = () => dispatch({type: FitActionType.SET_PLOT_POINTS, plotPoints: []});

  const handleSubmit = () => {
    updateGraphPoints();
    toggleModal();
  };

  return (
    <div className={styles.dataHandlerWrapper}>
      <DataTable plotPoints={state.rawPoints} dispatch={dispatch}/>
      <div className={styles.buttonsWrapper}>
        <label className={styles.csvButton} htmlFor="file">Open CSV</label>
        <input id="file" className={styles.fileInput} type="file" accept="text/csv" name="csv reader" onChange={handleFileRead}/>
        <Button type="button" onClick={handlePointsReset} text="Clean Data"/>
        <Button type="submit" onClick={handleSubmit} text="Submit"/>
        <Button type="button" onClick={toggleModal} text="Cancel"/>
      </div>
    </div>
  );
};
