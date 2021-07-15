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

//-> request
// const request = new CurveFitRequest();
//
// if (!calculationData.length) return console.error('data is empty');
//
// const [xData, yData] = splitDataArray(calculationData);
// const expressionsList = composeExpressionList(expressions);
//
// if (!expressionsList.length) return console.error('expression list is empty');
//
// console.log('send data:', xData, yData, expressionsList);

// request.setXDataList(xData);
// request.setYDataList(yData);
// request.setExpressionsList(expressionsList);
//
// approximationsrv.fitCurves(request, metadata, (err, res) => {
//   if (err) {
//     console.log(err.code, err.message);
//     return;
//   }
//   console.log(res.toObject().fitResultList);
// });