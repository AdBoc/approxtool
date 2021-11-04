import { FitResponse } from '../../types/fitResult';

export function rateResults(fitObject: FitResponse, index: number, array: FitResponse[]) {
  if (!fitObject.successStatus) return;
  fitObject.parametersList.forEach(param => {
    if (param.value === 1) return array[index].successStatus = 'WARN';
    if (param.stderr === 0 || isNaN(param.stderr)) return array[index].successStatus = 'WARN';
  });
}
