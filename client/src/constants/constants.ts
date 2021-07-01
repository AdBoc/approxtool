import { FitResult } from '../protos/approximation_pb';
import {
  GetUserResponse,
  Role
} from '../protos/user_pb';
import { gRPCClients } from '../gRPCClients';
import { FitStateExpression } from '../types/stateExpression';

export const csvRegex = /^.*\.csv$/gm;
export const csvSplitter = /\r?\n|,/;
export const pasteSplitter = /\r?\n|,|\t/;

export enum Errors {
  ERR_CSV_EXT = 'Wrong File Extension',
  ERR_PARSING_FILE = 'Problem parsing input file.'
}

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const splitExpressionChars = ['+', '-', '*', '^', '**', '(', ')', '/', ' ']; //TODO: DO I NEED ' '?

export const allowedMathSymbols: { [key: string]: boolean } = {
  acos: true,
  acosh: true,
  asin: true,
  asinh: true,
  atan: true,
  atan2: true,
  atanh: true,
  cos: true,
  cosh: true,
  exp: true,
  factorial: true,
  log: true,
  log10: true,
  pow: true,
  radians: true,
  sin: true,
  sinh: true,
  sqrt: true,
  tan: true,
  tanh: true,
  ln: true,
};

// export const expandMin = 0.9;
// export const expandMax = 1.1;

export const roles = {
  0: 'user',
  1: 'admin'
}

export const userMetadata = {'service-header': 'user_service'};
export const modelMetadata = {'service-header': 'model_service'};
export const approxMetadata = {'service-header': 'approximation_service'};
export const userSrv = gRPCClients.userServiceClient;
export const modelSrv = gRPCClients.modelServiceClient;
export const approximationSrv = gRPCClients.approximationClient;

//TODO: TESTING TEMP DATA
export const DATA: number[] = [107.608, 60.323, 108.632, 61.122, 109.773, 60.171, 110.929, 61.187, 112.075, 63.221, 113.27, 63.639, 115.094, 64.989, 116.219, 63.761, 117.388,
  66.019, 118.734, 67.857, 120.445, 68.169, 121.95, 66.513, 123.366, 68.655, 125.368, 69.564, 127.852, 69.331, 130.081, 70.551];

export const MODELS: FitStateExpression[] = [
  {
    id: 1,
    name: 'Linear',
    expression: 'a * x + b',
    lexexpression: 'a \\cdot x+b',
    isSelected: false,
    params: [
      {
        paramName: 'a',
        paramValue: 1,
        minBound: -Infinity,
        maxBound: Infinity,
      },
      {
        paramName: 'b',
        paramValue: 1,
        minBound: -Infinity,
        maxBound: Infinity,
      }
    ]
  },
  // {
  //   id: 2,
  //   name: 'Quadratic',
  //   expression: 'a * x + b * x ** 2 + c',
  //   lexexpression: 'a \\cdot x+b \\cdot x^{2}+c',
  //   isSelected: false,
  // },
  // {
  //   id: 3,
  //   name: 'Nonlinear1',
  //   expression: 'a * sin ( b * x ) + c',
  //   lexexpression: '\\mathrm{sin}\\left(b \\cdot x\\right) \\cdot a+c',
  //   isSelected: false,
  // },
  // {
  //   id: 4,
  //   name: 'Nonlinear2',
  //   expression: 'a * exp ( - b * x ) + c',
  //   lexexpression: '\\frac{a}{e^{b \\cdot x}}+c',
  //   isSelected: false,
  // },
  // {
  //   id: 5,
  //   name: 'Nonlinear3',
  //   expression: 'd + ( a - d / 1 + ( x / c ) ** b )',
  //   lexexpression: '\\frac{x^{b}}{c}+a',
  //   isSelected: false,
  // },
];

export const RESULTS: FitResult.AsObject[] = [
  {
    modelId: 1,
    successStatus: true,
    modelName: 'name1',
    modelExpression: 'a * x + b',
    r: 0.92,
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
    r: 0.93,
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
  },
  {
    modelId: 3,
    successStatus: true,
    r: 0.79,
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
  },
  {
    modelId: 4,
    successStatus: false,
    r: 0,
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
  }
];

export const USERS: GetUserResponse.AsObject[] = [{
  id: 1,
  username: 'Billy',
  email: 'Bill@Herrington.com',
  status: Role.BASIC_USER,
}, {
  id: 2,
  username: 'Van',
  email: 'Van@Sama.com',
  status: Role.BASIC_USER
}];