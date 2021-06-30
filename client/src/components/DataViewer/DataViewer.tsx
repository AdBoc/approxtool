import React, {
  BaseSyntheticEvent,
  Dispatch,
  SetStateAction
} from 'react';
import { readCSV } from './DataView.utils';
import { parseCSVText } from '../../utils/dataParsing';
import { Errors } from '../../constants/constants';
import { Modal } from '../../common-components/Modal/Modal';
import { DataTable } from '../DataTable';
import styles from './styles.module.scss';

interface Props {
  isShowing: boolean;
  calculationData: number[];
  setCalculationData: Dispatch<SetStateAction<number[]>>;
}

export const DataViewer: React.FC<Props> = ({calculationData, isShowing, setCalculationData}): JSX.Element => {
  const handleFileRead = async (e: BaseSyntheticEvent) => {
    const file = e.target.files as FileList;
    try {
      const result = await readCSV(file[0]);
      const parsedData = parseCSVText(result);
      setCalculationData(parsedData);
    } catch (error) {
      if (error.message === Errors.ERR_CSV_EXT) console.error('Wrong file extension'); //TODO: Handle
    }
  };

  return (
    <Modal isShowing={isShowing}>
      <div className={styles.viewerWrapper}>
        <label>Open CSV file:
          <input type="file" accept="text/csv" name="csv reader" onChange={handleFileRead}/>
        </label>
        <DataTable setCalculationData={setCalculationData} calculationData={calculationData}/>
      </div>
    </Modal>
  );
};
