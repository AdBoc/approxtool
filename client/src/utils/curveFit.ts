import {
  GenericObject,
  Point
} from '../types';
import { Parser } from 'expr-eval';
import { parseAsterisks } from './dataParsing';
import { GraphExpression, } from '../types/stateExpression';
import { FitResult } from '../protos/approximation_pb';

/**
 * calculate points to draw on graph from string expression
 * @param expression string expression
 * @param expressionParams array holding params
 * @param xMin - minimal x value for axis
 * @param xMax - max x value for axis
 * @return [[x],[y]] points are returned in successful calculation, undefined is returned on error
 */
export function calculatePoints(expression: string, expressionParams: GenericObject<number>, xMin = -100, xMax = 100): Point[] | false {
  const parser = new Parser();

  const points: Point[] = [];

  // const pointNum = 250;
  // const iteratorAddValue = (xMax - xMin) / pointNum;

  try {
    let expressionToEval = expression.replace(/ /g, ''); //TODO: NECESSARY?
    expressionToEval = parseAsterisks(expressionToEval);
    const expr = parser.parse(expressionToEval);
    console.log(expr);
    console.log(expressionParams);
    for (let x = xMin; x < xMax; x++) {
      points.push([x, expr.evaluate({...expressionParams, x})]);
    }
  } catch (e) {
    return false;
  }
  console.log(points);
  return points;
}

/**
 * calculate points to draw on graph from string expression
 * @param expressions
 * @param xMin
 * @param xMax
 * @return {name, points} are returned on successful calculation, false is returned on error
 */
export function calculateExpressionsPoints(expressions: FitResult.AsObject[], xMin: number, xMax: number): GraphExpression[] | false {
  const parsedExpressions: GraphExpression[] = [];


  for (let i = 0; i <= expressions.length - 1; i++) {
    const expression = expressions[i];

    if (!expression.successStatus) continue;

    const parsedExpression = parseAsterisks(expression.modelExpression, true).replaceAll(' ', '');

    const params = expression.parametersList.reduce((parameters, curr) => {
      parameters[curr.name] = curr.value;
      return parameters;
    }, {} as GenericObject<number>);

    const result = calculatePoints(parsedExpression, params, xMin, xMax);
    if (result) {
      parsedExpressions.push({
        id: expression.modelId,
        name: expression.modelName,
        points: result,
      });
    }
  }

  return parsedExpressions;
}

/**
 * calculate min and max for y from array of points
 * @param points source of values
 * @return [min,max] are returned on success, false if array is empty
 */
export function getYAxisMinMax(points: Point[]): [number, number] {
  let min = Infinity,
    max = -Infinity;

  points.forEach(([_, y]) => {
    if (y < min) min = y;
    if (y > max) max = y;
  });

  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0, 0];
  return [min, max];
}

/**
 * calculate min and max for y from array of points
 * @param points source of values
 * @return [min,max] are returned on success, false if array is empty
 */
export function getXAxisMinMax(points: Point[]): [number, number] {
  let min = Infinity,
    max = -Infinity;

  points.forEach(([x, _]) => {
    if (x < min) min = x;
    if (x > max) max = x;
  });

  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0, 0];
  return [min, max];
}

export function getXYAxisMinMax(points: Point[]): [number, number, number, number] {
  let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;

  points.forEach(([x, y]) => {
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  }); //TODO: FOR??

  if (!Number.isFinite(xMin) || !Number.isFinite(xMax) || !Number.isFinite(yMin) || !Number.isFinite(yMax)) return [0, 0, 0, 0];
  return [xMin, xMax, yMin, yMax];
}


//TODO: DRY CODE?
