import React, {
  BaseSyntheticEvent,
  useState
} from 'react';
import styles from './styles.module.scss';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../common-components/Modal/Modal';
import { Button } from '../../common-components/Button/Button';
import { graphDataManager } from '../../utils/GraphData';
import {
  CurveFitActions,
  FitActionType
} from '../../reducers/curveFitReducer';
import { FitRes } from '../../types/fitResult';

interface Props {
  results: FitRes[];
  dispatch: React.Dispatch<CurveFitActions>;
}

export const FitResults: React.FC<Props> = ({results, dispatch}): JSX.Element => {
  const [highlightedResult, setHighlightedResult] = useState<FitRes | null>(null);
  const {isShowing, toggle} = useModal();

  const handleShowDetails = (result: FitRes) => {
    if (!result.successStatus) return;
    setHighlightedResult(result);
    toggle();
  };

  const handleCopyFunction = (e: BaseSyntheticEvent) => {
    console.error('Unimplemented');
  };

  const drawExpression = (e: BaseSyntheticEvent, result: FitRes) => {
    e.stopPropagation();
    let expression = graphDataManager.getExpression(result);
    if (!expression) {
      console.error('Error calculation expression');
      return;
    }
    dispatch({type: FitActionType.SET_GRAPH_EXPRESSION, expression});
  };

  return (
    <>
      <div>
        {results.map((result, index) => (
          <div
            key={index}
            className={`${styles.resultElement} ${!result.successStatus ? styles.errorFit : result.successStatus === 'WARN' ? styles.warnFit : styles.properFit}`}
            onClick={() => handleShowDetails(result)}
          >
            <p>{result.modelName}</p>
            {result.successStatus &&
            <Button
                className={styles.drawButton}
                text="Draw"
                value={result.modelId}
                onClick={(e) => drawExpression(e, result)}/>}
          </div>
        ))}
      </div>
      <Modal isShowing={isShowing}>
        <Button text="Copy model expression" type="button" onClick={handleCopyFunction}/>
        {/*<TexMath block math={highlightedResult?}TODO: APPLY LEXEXPRESSION*/}
        <h2>Overview</h2>
        <p>Model: {highlightedResult?.modelName}</p>
        <p>R: {highlightedResult?.r}</p>
        <p>R^2: {highlightedResult?.rSqrt}</p>
        <p>BIC: {highlightedResult?.bic}</p>
        <p>AIC: {highlightedResult?.aic}</p>
        <p>FOG: {highlightedResult?.fog}</p>
        <h2>Parameters</h2>
        {highlightedResult?.parametersList.map(parameter =>
          <div key={parameter.name}>
            <span>{parameter.name} : {parameter.value}</span>
            <span>Std Err:{parameter.stderr}</span>
          </div>
        )}
        <Button text="Close" type="submit" onClick={toggle}/>
      </Modal>
    </>
  );
};

//TODO: Add id to result
//TODO: SEND COMPONENT TO MODAL AS PROP??
