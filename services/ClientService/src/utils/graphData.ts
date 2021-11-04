import { GraphExpression, } from '../types/stateExpression';
import { parseAsterisks } from './dataParsing';
import { GenericObject } from '../types';
import { calculatePoints } from './curveFit';
import { FitResponse } from '../types';

class GraphDataManager {
  #calculatedExpressions: GraphExpression[] = [];
  #xMin = 0;
  #xMax = 0;

  private addExpression(result: FitResponse) {
    const parsedExpression = parseAsterisks(result.modelExpression, 'js').replaceAll(' ', '');

    const params = result.parametersList.reduce((parameters, parameter) => {
      parameters[parameter.name] = parameter.value;
      return parameters;
    }, {} as GenericObject<number>);

    const graphPoints = calculatePoints(parsedExpression, params, this.#xMin, this.#xMax);

    const newExpression = {
      id: result.modelId,
      name: result.modelName,
      points: graphPoints,
    };

    this.#calculatedExpressions.push(newExpression);
    return newExpression;
  };

  public setXMinMax(min: number, max: number) {
    this.#xMin = min;
    this.#xMax = max;
  };

  public getExpression(expression: FitResponse) {
    let graphExpr: undefined | false | GraphExpression;
    graphExpr = this.#calculatedExpressions.find(({id}) => expression.modelId === id);
    if (!graphExpr) graphExpr = this.addExpression(expression);
    return graphExpr;
  };

  public clearExpressions() {
    this.#calculatedExpressions = [];
  };
}

export const graphDataManager = new GraphDataManager();