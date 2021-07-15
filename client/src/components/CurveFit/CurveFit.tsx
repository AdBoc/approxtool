import React, {
  useEffect,
  useReducer
} from 'react';
import {
  expressionParams,
  parsePointsForGraph,
  parsePointsForRequest,
} from '../../utils/dataParsing';
import { useModal } from '../../hooks/useModal';
import { SideBar } from '../SideBar';
import { DataHandler } from '../DataHandler';
import { Models } from '../Models';
import { Modal } from '../../common-components/Modal/Modal';
import { FitResults } from '../FitResults';
import {
  curveFitReducer,
  FitActionType,
  initialCurveState,
} from '../../reducers/curveFitReducer';
import {
  fetchModels,
  fetchResults,
} from '../../temporary/sim-request/sim-request';
import { Graph } from '../Graph';
import { graphDataManager } from '../../utils/GraphData';
import { getXYAxisMinMax } from '../../utils/curveFit';
import styles from './styles.module.scss';
import { GetModelsRequest } from '../../protos/model_pb';
import {
  approximationSrv,
  approxMetadata,
  modelMetadata,
  modelSrv,
} from '../../constants/constants';
import {
  CurveFitRequest,
  Expression,
  RequestExpressionParameter,
} from '../../protos/approximation_pb';
import { RateResult } from './CurveFit.utils';
import { Button } from '../../common-components/Button/Button';

export const CurveFit = () => {
  const [state, dispatch] = useReducer(curveFitReducer, initialCurveState);

  const {isShowing: isDataModal, toggle: toggleDataModal} = useModal();
  const {isShowing: isModelsSelection, toggle: toggleModelsSelection} = useModal();

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      fetchModels().then(models => dispatch({type: FitActionType.SET_MODELS, models}));
    } else {
      const request = new GetModelsRequest();
      request.setUserid(1) //TODO: STATIC
      modelSrv.getUserModels(request, modelMetadata, (err, res) => {
        if (err) {
          console.log(err.code, err.message);
          return;
        }
        const models = res.toObject().modelsList.map(model => {
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
        dispatch({type: FitActionType.SET_MODELS, models})
      });
    }
  }, []);

  const handleApproximation = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      fetchResults().then(results => {
        results.forEach(RateResult);
        dispatch({type: FitActionType.SET_RESULT, result: results});
        graphDataManager.clearExpressions();
      });
    } else {
      const expressions: Expression[] = [];

      state.allModels
        .filter(({id}) => state.fitSelectedModelIds.includes(id))
        .forEach(({id, name, expression, params}) => {
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
          newExpression.setParametersList(parsedParams)

          expressions.push(newExpression);
        });

      if (!state.rawPoints.length || !expressions.length) return;

      const [xData, yData] = parsePointsForRequest(state.rawPoints); //TODO: ADD TO CLASS?

      const request = new CurveFitRequest();

      request.setExpressionsList(expressions);
      request.setXDataList(xData);
      request.setYDataList(yData);

      approximationSrv.fitCurves(request, approxMetadata, (err, res) => {
        if (err) {
          console.log(err.code, err.message);
          return;
        }

        const fitResult = res.toObject().fitResultList.sort((a, b) => a.rSqrt - b.rSqrt);

        fitResult.forEach(RateResult);

        dispatch({type: FitActionType.SET_RESULT, result: fitResult});
      });

      graphDataManager.clearExpressions();
    }
  };

  const updateGraphPoints = () => {
    toggleDataModal();
    if (!state.rawPoints.length) return;
    const graphPoints = parsePointsForGraph(state.rawPoints);
    const [xMin, xMax, yMin, yMax] = getXYAxisMinMax(graphPoints);
    graphDataManager.setXMinMax(xMin, xMax);
    dispatch({type: FitActionType.RAW_POINTS_TO_GRAPH_POINTS, graphPoints});
    dispatch({type: FitActionType.SET_DOMAINS, xDomain: [xMin, xMax], yDomain: [yMin, yMax]}); //TODO: refactor??
  };

  return (
    <>
      <SideBar/>
      <div className={styles.curveFitWrapper}>
        <div className={styles.graphWrapper}>
          {Boolean(state.fitResult.length) && (
            <FitResults results={state.fitResult} dispatch={dispatch}/>
          )}
          {Boolean(state.graphPoints.length) && (
            <Graph
              graphExpression={state.graphExpression}
              points={state.graphPoints}
              xScaleDomain={state.xDomain}
              yScaleDomain={state.yDomain}
            />
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
            (Make sure that models is correct and correct bounds are set).
          </p>
          <Button text="Fit" type="button" onClick={handleApproximation}/>
        </div>
        <Modal isShowing={isDataModal}>
          <DataHandler toggleModal={updateGraphPoints} state={state} dispatch={dispatch}/>
        </Modal>
        <Modal isShowing={isModelsSelection}>
          <Models dispatch={dispatch} expressions={state.allModels} closeModelsModal={toggleModelsSelection}/>
        </Modal>
      </div>
    </>
  );
};

// TODO: ADD TEMPORARY MODEL
// TODO: If someone changes points after fit it should be flushed
// TODO: create reducer! or context
// TODO: DB with tags and set that takes them by id and consumes and sends??
