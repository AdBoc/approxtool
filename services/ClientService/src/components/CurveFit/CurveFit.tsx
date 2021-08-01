import React, {
  useEffect,
  useReducer
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  apiSrv,
  fetchWithAuthRetry,
} from '../../grpc-web';
import { RateResult } from './CurveFit.utils';
import { GetModelsRequest } from '../../protos/modelservice_pb';
import { token } from '../../utils/token';
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
import { SideBar } from '../SideBar';
import { DataHandler } from '../DataHandler';
import { Models } from '../Models';
import { FitResults } from '../FitResults';
import {
  fetchTempModels,
  fetchTempResults,
} from '../../temporary/sim-request/sim-request';
import {
  CurveFitRequest,
  Expression,
  RequestExpressionParameter
} from '../../protos/approximationservice_pb';
import styles from './styles.module.scss';

export const CurveFit = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(curveFitReducer, initialCurveState);

  const {isShowing: isDataModal, toggle: toggleDataModal} = useModal();
  const {isShowing: isModelsSelection, toggle: toggleModelsSelection} = useModal();

  useEffect(() => {
    async function fetchModels() {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        fetchTempModels().then(models => dispatch({type: FitActionType.SET_MODELS, models}));
      } else {
        const request = new GetModelsRequest();

        try {
          const response = await fetchWithAuthRetry(() => {
            request.setAccesstoken(token.accessToken);
            return apiSrv.getUserModels(request, null)
          });

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

          dispatch({type: FitActionType.SET_MODELS, models});
        } catch
          (e) {
          console.error(e);
        }
      }
    }

    fetchModels();
  }, [history]);

  const handleApproximation = async () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      fetchTempResults().then(results => {
        results.forEach(RateResult);
        dispatch({type: FitActionType.SET_RESULT, result: results});
        graphDataManager.clearExpressions();
      });
    } else {
      const expressions: Expression[] = [];

      state.allModels
        .filter(({id}) => state.fitSelectedModelIds.includes(id))
        .forEach(({id, name, expression, lexexpression, params}) => {
          const parsedParams = params.map(param => {
            const requestParams = new RequestExpressionParameter();

            requestParams.setParamname(param.paramName);
            requestParams.setParamvalue(param.paramValue);
            requestParams.setMinbound(param.minBound);
            requestParams.setMaxbound(param.maxBound);

            return requestParams;
          });

          const newExpression = new Expression();

          newExpression.setId(id);
          newExpression.setName(name);
          newExpression.setExpression(expression);
          newExpression.setLexExpression(lexexpression);
          newExpression.setParametersList(parsedParams);

          expressions.push(newExpression);
        });

      if (!state.rawPoints.length || !expressions.length) return;

      const [xData, yData] = parsePointsForRequest(state.rawPoints); //TODO: ADD TO CLASS?

      const request = new CurveFitRequest();

      request.setExpressionsList(expressions);
      request.setXDataList(xData);
      request.setYDataList(yData);

      try {
        const result = await fetchWithAuthRetry(() => {
          request.setAccessToken(token.accessToken);
          return apiSrv.fitCurves(request, null);
        });

        const fitResult = result.toObject().fitResultList.sort((a, b) => b.rSqrt - a.rSqrt);
        fitResult.forEach(RateResult);
        dispatch({type: FitActionType.SET_RESULT, result: fitResult});
      } catch (e) {
        console.error(e)
      }
      graphDataManager.clearExpressions();
    }
  };

  return (
    <>
      <SideBar/>
      <div className={styles.curveFitWrapper}>
        <div className={styles.graphWrapper}>
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
        </div>
        <div className={styles.fittingButtons}>
          <p>1. Provide data by pasting it into the table or selecting csv file</p>
          <Button text="Enter data" type="button" onClick={toggleDataModal}/>
          <p>
            2. Select models for fitting,
            add temporary models (will be lost on page reload),
            set parameters initial guess and bounds values (Initial guess value is always 1, bounds are -Infinite,
            Infinite)
          </p>
          <Button text="Select models" type="button" onClick={toggleModelsSelection}/>
          <p>3. Send fit request.</p>
          <p>
            Green is valid calculation.
            Yellow color indicates that the result should only be used with caution.
            It indicates that the calculation succeeded, but with reservations.
            Red color means that calculation failed and threw exception
            (Likely generated NaN values, make sure that models and its bounds are correct).
          </p>
          <Button text="Fit" type="button" onClick={handleApproximation}/>
        </div>
        <Modal isShowing={isDataModal}>
          <DataHandler state={state} toggleModal={toggleDataModal} dispatch={dispatch}/>
        </Modal>
        <Modal isShowing={isModelsSelection}>
          <Models expressions={state.allModels} closeModelsModal={toggleModelsSelection} dispatch={dispatch}/>
        </Modal>
      </div>
    </>
  );
};
