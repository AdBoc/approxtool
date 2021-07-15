import {
  MODELS,
  RESULTS,
  USERS
} from '../../constants/constants';
import { FitResult } from '../../protos/approximation_pb';
import { GetUserResponse } from '../../protos/user_pb';
import { FitStateExpression } from '../../types/stateExpression';
import { FitRes } from '../../types/fitResult';

export function fetchModels(): Promise<FitStateExpression[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MODELS), 1000);
  });
}

export function fetchResults(): Promise<FitRes[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(RESULTS), 1000);
  });
}

export function fetchUsers(): Promise<GetUserResponse.AsObject[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(USERS), 1000);
  });
}