import {
  MODELS,
  RESULTS,
  USERS
} from '../../constants/constants';
import { FitStateExpression } from '../../types/stateExpression';
import { FitRes } from '../../types/fitResult';
import { User } from '../../types';

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

export function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(USERS), 1000);
  });
}