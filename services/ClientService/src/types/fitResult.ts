import { FitResult } from '../protos/approximationservice_pb';

export interface FitResponse extends Omit<FitResult.AsObject, 'successStatus'> {
  successStatus: boolean | 'WARN';
}
