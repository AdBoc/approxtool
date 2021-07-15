import { FitResult } from '../protos/approximation_pb';

export interface FitRes extends Omit<FitResult.AsObject, 'successStatus'> {
  successStatus: boolean | 'WARN'; // TODO: INTRODUCE ENUM IN PROTO?
}
