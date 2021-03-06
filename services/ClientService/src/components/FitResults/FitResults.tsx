import React, {
  BaseSyntheticEvent,
  useState
} from 'react';
import styles from './styles.module.scss';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../common-components/Modal/Modal';
import { Button } from '../../common-components/Button/Button';
import { graphDataManager } from '../../utils/graphData';
import {
  CurveFitActions,
  FitActionType
} from '../../reducers/curveFitReducer';
import { FitResponse } from '../../types/fitResult';
import TexMath from '@matejmazur/react-katex';

interface Props {
  results: FitResponse[];
  dispatch: React.Dispatch<CurveFitActions>;
}

export const FitResults: React.FC<Props> = ({results, dispatch}): JSX.Element => {
  const [highlightedResult, setHighlightedResult] = useState<FitResponse | null>(null);
  const {isShowing, toggle} = useModal();

  const handleShowDetails = (result: FitResponse) => {
    if (!result.successStatus) return;
    setHighlightedResult(result);
    toggle();
  };

  const drawExpression = (e: BaseSyntheticEvent, result: FitResponse) => {
    e.stopPropagation();
    let expression = graphDataManager.getExpression(result);
    if (!expression) {
      console.error('Error while calculating expression');
      return;
    }
    dispatch({type: FitActionType.SET_GRAPH_EXPRESSION, expression});
  };

  const handleLatexToClipboard = async (lexExpression: string) => {
    try {
      await navigator.clipboard.writeText(lexExpression);
    } catch (e) {
      console.error('Failed to copy');
    }
  };

  const handleParamsToExcel = async () => {
    let formattedText = '';
    for (const result of Object.values(highlightedResult!.parametersList)) {
      formattedText += `${result.name}\t${result.value}\n`; //\n -> go to next column, \t -> go lower 
    }
    try {
      await navigator.clipboard.writeText(formattedText);
    } catch (e) {
      console.error('Failed to copy');
    }
  };

  return (
    <>
      <div className={styles.resultsWrapper}>
        {results.map((result, index) => (
          <div
            key={index}
            className={`${styles.resultElement} ${!result.successStatus ? styles.errorFit : result.successStatus === 'WARN' ? styles.warnFit : styles.properFit}`}
            onClick={() => handleShowDetails(result)}
          >
            <p>{result.rootMeanSquaredError.toFixed(2)}</p>
            <p className={styles.resultName}>{result.modelName}</p>
            {result.successStatus &&
            <Button
                className={styles.drawButton}
                text="Draw"
                value={result.modelId}
                onClick={(e) => drawExpression(e, result)}
            />}
          </div>
        ))}
      </div>
      <Modal isShowing={isShowing} className={styles.detailsView}>
        <TexMath
          block
          className={styles.katexArea}
          math={highlightedResult?.lexExpression}
          onClick={() => handleLatexToClipboard(highlightedResult!.lexExpression)}
        />
        <h2>Overview</h2>
        <p>Name: {highlightedResult?.modelName}</p>
        <p>nfree: {highlightedResult?.fog}</p>
        <p>R^2: {highlightedResult?.rSqrt}</p>
        <p>BIC: {highlightedResult?.bic}</p>
        <p>AIC: {highlightedResult?.aic}</p>
        <p>mean error: {highlightedResult?.meanError}</p>
        <p>mean squared error: {highlightedResult?.meanSquaredError}</p>
        <p>root mean squared error: {highlightedResult?.rootMeanSquaredError}</p>
        <h2>Parameters</h2>
        <div className={styles.parametersWrapper} onClick={handleParamsToExcel}>
          {highlightedResult?.parametersList.map(parameter =>
            <div key={parameter.name} className={styles.parameters}>
              <span>{parameter.name}: {parameter.value}</span>
              <span>Std Err: {parameter.stderr}</span>
            </div>
          )}
        </div>
        <Button text="Close" type="submit" onClick={toggle}/>
      </Modal>
    </>
  );
};
