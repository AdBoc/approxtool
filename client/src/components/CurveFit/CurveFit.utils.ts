import { StateExpression } from '../../types';


export function composeExpressionList(expressions: StateExpression[]): string[] {
  return expressions.filter(({isSelected}) => isSelected).map(expression => expression.expression);
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