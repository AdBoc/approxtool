import { StateExpression } from '../../types';
import { FitRes } from '../../types/fitResult';


export function composeExpressionList(expressions: StateExpression[]): string[] {
  return expressions.filter(({isSelected}) => isSelected).map(expression => expression.expression);
}

//stderr too big or 0 or NaN??
export function RateResult(fitObject: FitRes, index: number, array: FitRes[]) {
  if (!fitObject.successStatus) return;
  fitObject.parametersList.forEach(param => {
    if (param.value === 1) return array[index].successStatus = 'WARN';
    if (param.stderr > 10000 || param.stderr === 0 || isNaN(param.stderr)) return array[index].successStatus = 'WARN';
  });
}
