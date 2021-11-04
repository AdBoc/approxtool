import { Point } from '../types';
import {
  ExpressionParameter,
  FitStateExpression,
  GraphExpression,
} from '../types/stateExpression';
import { FitResponse } from '../types/fitResult';

export type CurveFitState = {
  allModels: { [k: string]: FitStateExpression[] };
  graphExpression: GraphExpression | null;
  graphPoints: Point[];
  fitResult: FitResponse[];
  rawPoints: number[];
  xDomain: [number, number];
  yDomain: [number, number];
};

export enum FitActionType {
  SET_MODELS = 'SET_MODELS',
  SET_PLOT_POINTS = 'SET_PLOT_POINTS',
  SET_RESULT = 'SET_RESULT',
  TOGGLE_MODEL_SELECT = 'TOGGLE_MODEL_SELECT',
  RAW_POINTS_TO_GRAPH_POINTS = 'RAW_POINTS_TO_GRAPH_POINTS',
  SET_GRAPH_EXPRESSION = 'SET_GRAPH_EXPRESSION',
  SET_DOMAINS = 'SET_DOMAINS',
  TOGGLE_ALL = 'TOGGLE_ALL',
  TOGGLE_TAG = 'TOGGLE_TAG',
  CHANGE_PARAMS = 'CHANGE_PARAMS',
  ADD_TEMP_MODEL = 'ADD_TEMP_MODEL',
}

export type CurveFitActions =
  { type: FitActionType.SET_MODELS, models: { [k: string]: FitStateExpression[] } } |
  { type: FitActionType.SET_PLOT_POINTS, plotPoints: number[] } |
  { type: FitActionType.SET_RESULT, result: FitResponse[] } |
  { type: FitActionType.TOGGLE_MODEL_SELECT, id: number, tag: string } |
  { type: FitActionType.RAW_POINTS_TO_GRAPH_POINTS, graphPoints: Point[] } |
  { type: FitActionType.SET_GRAPH_EXPRESSION, expression: GraphExpression } |
  { type: FitActionType.SET_DOMAINS, xDomain: [number, number], yDomain: [number, number] } |
  { type: FitActionType.TOGGLE_ALL } |
  { type: FitActionType.TOGGLE_TAG, tag: string } |
  { type: FitActionType.CHANGE_PARAMS, params: ExpressionParameter[], modelId: number, tag: string } |
  { type: FitActionType.ADD_TEMP_MODEL, model: FitStateExpression };

type CurveFitReducer = (state: CurveFitState, action: CurveFitActions) => CurveFitState;

export const curveFitReducer: CurveFitReducer = (state, action) => {
  switch (action.type) {
    case FitActionType.SET_MODELS:
      return {
        ...state,
        allModels: action.models
      };
    case FitActionType.SET_PLOT_POINTS:
      return {
        ...state,
        rawPoints: action.plotPoints
      };
    case FitActionType.SET_RESULT:
      return {
        ...state,
        fitResult: action.result,
        graphExpression: null,
      };
    case FitActionType.TOGGLE_MODEL_SELECT: {
      const newModels = {...state.allModels};
      newModels[action.tag] = newModels[action.tag].map(model => model.id === action.id
        ? {...model, isSelected: !model.isSelected}
        : model
      );

      return {
        ...state,
        allModels: newModels,
      };
    }
    case FitActionType.RAW_POINTS_TO_GRAPH_POINTS:
      return {
        ...state,
        graphPoints: action.graphPoints,
      };
    case FitActionType.SET_GRAPH_EXPRESSION:
      return {
        ...state,
        graphExpression: action.expression,
      };
    case FitActionType.SET_DOMAINS:
      return {
        ...state,
        xDomain: action.xDomain,
        yDomain: action.yDomain,
      }
    case FitActionType.ADD_TEMP_MODEL:
      return {
        ...state,
        allModels: {
          ...state.allModels,
          Unassigned: [...state.allModels.Unassigned, action.model]
        }
      }
    case FitActionType.CHANGE_PARAMS:
      return {
        ...state,
        allModels: {
          ...state.allModels,
          [action.tag]: state.allModels[action.tag].map(model => model.id === action.modelId
            ? {...model, params: action.params}
            : model
          ),
        }
      };
    case FitActionType.TOGGLE_ALL: {
      const isSelectedVal = Object.values(state.allModels).some(models => models.some(model => model.isSelected));

      const newModels: { [k: string]: FitStateExpression[] } = {};
      Object.entries(state.allModels).forEach(([tag, models]) => newModels[tag] = [...models.map(model => ({...model}))]);
      Object.values(newModels).forEach(models => models.forEach(model => model.isSelected = !isSelectedVal));

      return {
        ...state,
        allModels: newModels
      };
    }
    case FitActionType.TOGGLE_TAG: {
      const isSelected = state.allModels[action.tag].some(model => model.isSelected);
      const newTagValues = state.allModels[action.tag].map(model => ({...model, isSelected: !isSelected}));
      return {
        ...state,
        allModels: {
          ...state.allModels,
          [action.tag]: newTagValues
        }
      }
    }
    default:
      return state;
  }
};

export const initialCurveState: CurveFitState = {
  allModels: {Unassigned: []},
  fitResult: [],
  graphExpression: null,
  graphPoints: [],
  rawPoints: [],
  xDomain: [0, 0],
  yDomain: [0, 0],
};
