import { FitResult } from '../protos/approximationservice_pb';

export interface FitRes extends Omit<FitResult.AsObject, 'successStatus'> {
  successStatus: boolean | 'WARN';
}
