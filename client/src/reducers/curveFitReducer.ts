import { Point } from '../types';
import {
  ExpressionParameter,
  FitStateExpression,
  GraphExpression,
} from '../types/stateExpression';
import { FitRes } from '../types/fitResult';

export type CurveFitState = {
  allModels: FitStateExpression[];
  graphExpression: GraphExpression | null;
  graphPoints: Point[];
  fitResult: FitRes[];
  fitSelectedModelIds: number[];
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
  SELECT_ALL_MODELS = 'SELECT_ALL_MODELS',
  UNSELECT_ALL_MODELS = 'UNSELECT_ALL_MODELS',
  CHANGE_PARAMS = 'CHANGE_PARAMS',
  ADD_TEMP_MODEL = 'ADD_TEMP_MODEL',
}

export type CurveFitActions =
  { type: FitActionType.SET_MODELS, models: FitStateExpression[] } |
  { type: FitActionType.SET_PLOT_POINTS, plotPoints: number[] } |
  { type: FitActionType.SET_RESULT, result: FitRes[] } |
  { type: FitActionType.TOGGLE_MODEL_SELECT, id: number } |
  { type: FitActionType.RAW_POINTS_TO_GRAPH_POINTS, graphPoints: Point[] } |
  { type: FitActionType.SET_GRAPH_EXPRESSION, expression: GraphExpression } |
  { type: FitActionType.SET_DOMAINS, xDomain: [number, number], yDomain: [number, number] } |
  { type: FitActionType.SELECT_ALL_MODELS } |
  { type: FitActionType.UNSELECT_ALL_MODELS } |
  { type: FitActionType.CHANGE_PARAMS, params: ExpressionParameter[], modelId: number } |
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
      const newModels = state.allModels.map(model => {
        if (model.id !== action.id) return model;
        return {...model, isSelected: !model.isSelected};
      });
      const newModelIds = state.fitSelectedModelIds.find(id => id === action.id)
        ? removeModelFromFitting(state.fitSelectedModelIds, action.id)
        : addModelToFit(state.fitSelectedModelIds, action.id);

      return {
        ...state,
        allModels: newModels,
        fitSelectedModelIds: newModelIds,
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
        allModels: [...state.allModels, action.model],
      }
    case FitActionType.CHANGE_PARAMS:
      return {
        ...state,
        allModels: state.allModels.map(model => {
          if (model.id === action.modelId) return {...model, params: action.params};
          return model;
        })
      }
    case FitActionType.SELECT_ALL_MODELS:
      return {
        ...state,
        allModels: state.allModels.map((model) => ({...model, isSelected: true})),
        fitSelectedModelIds: state.allModels.map(({id}) => id)
      };
    case FitActionType.UNSELECT_ALL_MODELS:
      return {
        ...state,
        allModels: state.allModels.map((model) => ({...model, isSelected: false})),
        fitSelectedModelIds: []
      }
    default:
      return state;
  }
};

export const initialCurveState: CurveFitState = {
  allModels: [],
  fitResult: [],
  fitSelectedModelIds: [],
  graphExpression: null,
  graphPoints: [],
  rawPoints: [],
  xDomain: [0, 0],
  yDomain: [0, 0],
};

function addModelToFit(modelIds: number[], id: number): number[] {
  return [...modelIds, id];
}

function removeModelFromFitting(modelIds: number[], id: number): number[] {
  const safeCopy = [...modelIds];
  const index = safeCopy.indexOf(id);
  if (index >= 0) {
    safeCopy.splice(index, 1);
  }
  return safeCopy;
}
