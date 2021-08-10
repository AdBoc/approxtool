import { FitRes } from '../../types/fitResult';

//stderr too big or 0 or NaN??
export function RateResult(fitObject: FitRes, index: number, array: FitRes[]) {
  if (!fitObject.successStatus) return;
  fitObject.parametersList.forEach(param => {
    if (param.value === 1) return array[index].successStatus = 'WARN';
    if (param.stderr === 0 || isNaN(param.stderr)) return array[index].successStatus = 'WARN';
  });
}
