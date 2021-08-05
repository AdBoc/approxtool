import { FitStateExpression } from '../../types/stateExpression';
import { FitRes } from '../../types/fitResult';
import { User } from '../../types';
import { Role } from '../../protos/userservice_pb';

export function fetchTempModels(): Promise<FitStateExpression[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MODELS), 1000);
  });
}

export function fetchTempResults(): Promise<FitRes[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(RESULTS), 1000);
  });
}

export function fetchTempUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(USERS), 1000);
  });
}

const MODELS: FitStateExpression[] = [
  {
    id: 1,
    name: 'Linear',
    expression: 'a * x + b',
    lexexpression: 'a \\cdot x+b',
    isSelected: false,
    params: [
      {
        paramName: 'a',
        paramValue: 1.48,
        minBound: -Infinity,
        maxBound: Infinity,
      },
      {
        paramName: 'b',
        paramValue: 3,
        minBound: -Infinity,
        maxBound: Infinity,
      }
    ]
  },
  {
    id: 2,
    name: 'Linear2',
    expression: 'a * x + b',
    lexexpression: 'a \\cdot x+b',
    isSelected: false,
    params: [
      {
        paramName: 'a',
        paramValue: 1.48,
        minBound: -Infinity,
        maxBound: Infinity,
      },
      {
        paramName: 'b',
        paramValue: 3,
        minBound: -Infinity,
        maxBound: Infinity,
      }
    ]
  },
  {
    id: 3,
    name: 'Linear3',
    expression: 'a * x + b',
    lexexpression: 'a \\cdot x+b',
    isSelected: false,
    params: [
      {
        paramName: 'a',
        paramValue: 1.48,
        minBound: -Infinity,
        maxBound: Infinity,
      },
      {
        paramName: 'b',
        paramValue: 3,
        minBound: -Infinity,
        maxBound: Infinity,
      }
    ]
  },
];

const RESULTS: FitRes[] = [
  {
    modelId: 1,
    successStatus: true,
    modelName: 'name1',
    modelExpression: 'a * x + b',
    lexExpression: 'None',
    rSqrt: 0.90,
    aic: 40,
    bic: 113,
    fog: 13,
    meanOfX: 111,
    meanOfY: 124,
    chiSqrt: 454,
    reducedChiSqrt: 543,
    dataPoints: 11,
    fittingMethod: 'least-sq',
    parametersList: [{
      name: 'a',
      value: 1,
      stderr: 1,
    }, {
      name: 'b',
      value: 2,
      stderr: 2,
    }]
  },
  {
    modelId: 2,
    successStatus: true,
    rSqrt: 0.89,
    aic: 50,
    bic: 120,
    fog: 12,
    meanOfX: 543,
    meanOfY: 213,
    chiSqrt: 123,
    reducedChiSqrt: 543,
    dataPoints: 11,
    fittingMethod: 'least-sq',
    parametersList: [{
      name: 'a',
      value: 1,
      stderr: 1,
    }, {
      name: 'b',
      value: 2,
      stderr: 2,
    }, {
      name: 'c',
      value: 3,
      stderr: 3,
    }],
    modelName: 'name2',
    modelExpression: 'a * x + b * x ** 2 + c',
    lexExpression: 'None',
  },
  {
    modelId: 3,
    successStatus: true,
    rSqrt: 0.6,
    aic: 30,
    bic: 140,
    fog: 12,
    meanOfX: 321,
    meanOfY: 321,
    chiSqrt: 453,
    reducedChiSqrt: 453,
    dataPoints: 11,
    fittingMethod: 'least-sq',
    parametersList: [{
      name: 'a',
      value: 1,
      stderr: 1,
    }, {
      name: 'b',
      value: 2,
      stderr: 2,
    }, {
      name: 'c',
      value: 3,
      stderr: 3,
    }],
    modelName: 'name3',
    modelExpression: 'a * sin ( b * x ) + c',
    lexExpression: 'None',
  },
  {
    modelId: 4,
    successStatus: false,
    rSqrt: 0,
    aic: 0,
    bic: 0,
    fog: 0,
    meanOfX: 0,
    meanOfY: 0,
    chiSqrt: 0,
    reducedChiSqrt: 0,
    dataPoints: 0,
    fittingMethod: 'leastSq',
    parametersList: [{
      name: 'a',
      value: 1,
      stderr: 1,
    }, {
      name: 'b',
      value: 2,
      stderr: 2,
    }, {
      name: 'c',
      value: 3,
      stderr: 3,
    }],
    modelName: 'name4',
    modelExpression: 'a * exp ( -b * x ) + c',
    lexExpression: 'None',
  }
];

const USERS: User[] = [{
  id: 1,
  username: 'Billy',
  email: 'Bill@Herrington.com',
  status: Role.ADMIN,
}, {
  id: 2,
  username: 'Van',
  email: 'Van@Sama.com',
  status: Role.USER
}];