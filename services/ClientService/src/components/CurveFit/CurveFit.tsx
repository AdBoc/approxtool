import React, {
  useEffect,
  useReducer
} from 'react';
import { useHistory } from 'react-router-dom';
import { RateResult } from './CurveFit.utils';
import {
  expressionParams,
  parsePointsForRequest,
} from '../../utils/dataParsing';
import {
  curveFitReducer,
  FitActionType,
  initialCurveState,
} from '../../reducers/curveFitReducer';
import { useModal } from '../../hooks/useModal';
import { graphDataManager } from '../../utils/graphData';
import { Modal } from '../../common-components/Modal/Modal';
import { Graph } from '../../common-components/Graph';
import { Button } from '../../common-components/Button/Button';
import { DataHandler } from '../DataHandler';
import { Models } from '../Models';
import { FitResults } from '../FitResults';
import {
  fetchTempModels,
  fetchTempResults,
} from '../../temporary/sim-request/sim-request';
import styles from './styles.module.scss';
import { apiService } from '../../grpc-web/apiService';
import { useIsMounted } from '../../hooks/useIsMounted';
import { FitStateExpression } from '../../types/stateExpression';
import { isApiError } from '../../utils/isApiError';

export const CurveFit = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(curveFitReducer, initialCurveState);

  const isMounted = useIsMounted();

  const {isShowing: isDataModal, toggle: toggleDataModal} = useModal();
  const {isShowing: isModelsSelection, toggle: toggleModelsSelection} = useModal();

  useEffect(() => {
    async function fetchModels() {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        fetchTempModels().then(models => {
          const modelsObject: { [k: string]: FitStateExpression[] } = {};

          models.forEach(model => {
            if (!modelsObject.hasOwnProperty(model.tag)) modelsObject[model.tag] = [];
            modelsObject[model.tag].push(model);
          });

          if (isMounted()) dispatch({type: FitActionType.SET_MODELS, models: modelsObject});
        });
      } else {
        try {
          const response = await apiService.GetUserModels();

          if (isMounted()) {
            const models = response.toObject().modelsList.map(model => {
              const defaultParams = expressionParams(model.expression).map(param => ({
                paramName: param,
                paramValue: 1,
                minBound: -Infinity,
                maxBound: Infinity,
              }));

              return {
                ...model,
                isSelected: false,
                params: defaultParams
              }
            });

            const modelsObject: { [k: string]: FitStateExpression[] } = {};

            models.forEach(model => {
              if (!modelsObject.hasOwnProperty(model.tag)) modelsObject[model.tag] = [];
              modelsObject[model.tag].push(model);
            });

            dispatch({type: FitActionType.SET_MODELS, models: modelsObject});
          }
        } catch (err) {
          if (isApiError(err)) {
            console.error(err.code, err.message);
          }
        }
      }
    }

    fetchModels();
  }, [history, isMounted]);

  const handleApproximation = async () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      Object.values(state.allModels).reduce((acc, models) => {
        models.forEach(model => (model.isSelected && acc.push(model)));
        return acc;
      }, []);

      fetchTempResults().then(results => {
        results.forEach(RateResult);
        dispatch({type: FitActionType.SET_RESULT, result: results});
        graphDataManager.clearExpressions();
      });
    } else {
      const modelsList = Object.values(state.allModels).reduce((acc, models) => {
        models.forEach(model => (model.isSelected && acc.push(model)));
        return acc;
      }, []);

      if (!state.rawPoints.length) return;

      const [xData, yData] = parsePointsForRequest(state.rawPoints); //TODO: ADD TO CLASS METHOD?

      try {
        const response = await apiService.FitCurves(modelsList, xData, yData);
        if (isMounted()) {
          const fitResult = response.toObject().fitResultList
            .sort((a, b) => a.rootMeanSquaredError - b.rootMeanSquaredError);
          fitResult.forEach(RateResult);
          dispatch({type: FitActionType.SET_RESULT, result: fitResult});
        }
      } catch (err) {
        if (isApiError(err)) {
          console.error(err.code, err.message);
        }
      }
      graphDataManager.clearExpressions();
    }
  };

  return (
    <div>
      <section className={styles.graphWrapper}>
        {Boolean(state.graphPoints.length) && (
          <Graph
            responsive
            graphExpression={state.graphExpression}
            points={state.graphPoints}
            xScaleDomain={state.xDomain}
            yScaleDomain={state.yDomain}
          />
        )}
        {Boolean(state.fitResult.length) && (
          <FitResults results={state.fitResult} dispatch={dispatch}/>
        )}
      </section>
      <section className={styles.fittingButtons}>
        <p className={styles.descriptionText}>1. Provide data by pasting it into the table or selecting csv file</p>
        <Button text="Enter data" type="button" onClick={toggleDataModal}/>
        <p className={styles.descriptionText}>
          2. Select models for fitting,
          add temporary models (it will be lost on page reload),
          set parameters initial guess and bounds values (Default initial guess value is always 1, bounds are [-Infinite,
          Infinite])
        </p>
        <Button text="Select models" type="button" onClick={toggleModelsSelection}/>
        <p>3. Send fit request.</p>
        <p className={styles.descriptionText}>
          Green color indicates successful calculation.
          Yellow color indicates that the result should be used with caution.
          Red color means that calculation failed and threw exception
          (Likely generated NaN values, make sure that default and bounds of parameters are set correctly).
        </p>
        <Button text="Fit" type="button" onClick={handleApproximation}/>
      </section>
      <Modal isShowing={isDataModal}>
        <DataHandler state={state} toggleModal={toggleDataModal} dispatch={dispatch}/>
      </Modal>
      <Modal isShowing={isModelsSelection} className={styles.modelsModal}>
        <Models expressions={state.allModels} closeModelsModal={toggleModelsSelection} dispatch={dispatch}/>
      </Modal>
    </div>
  );
};
