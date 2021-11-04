import {
  GenericObject,
  Point
} from '../types';
import { Parser } from 'expr-eval';
import { parseAsterisks } from './dataParsing';
import { GraphExpression, } from '../types/stateExpression';
import { FitResponse } from '../types/fitResult';

/**
 * calculate points to draw on graph from string expression
 * @param expression string expression
 * @param expressionParams array holding params
 * @param xMin - minimal x value for axis
 * @param xMax - max x value for axis
 * @return [[x],[y]] points are returned in successful calculation, undefined is returned on error
 */
export function calculatePoints(expression: string, expressionParams: GenericObject<number>, xMin = -100, xMax = 100): Point[] {
  const parser = new Parser();

  const points: Point[] = [];

  const numOfPlotPoints = 1000;
  const addValue = (xMax - xMin) / numOfPlotPoints;

  const expr = parser.parse(parseAsterisks(expression, 'python').replace(/ /g, ''));
  
  for (let x = xMin; x < xMax; x += addValue) {
    points.push([x, expr.evaluate({...expressionParams, x})]);
  }

  return points;
}

/**
 * calculate points to draw on graph from string expression
 * @param expressions
 * @param xMin
 * @param xMax
 * @return {name, points} are returned on successful calculation, false is returned on error
 */
export function calculateExpressionsPoints(expressions: FitResponse[], xMin: number, xMax: number): GraphExpression[] | false {
  const parsedExpressions: GraphExpression[] = [];


  for (let i = 0; i <= expressions.length - 1; i++) {
    const expression = expressions[i];

    if (!expression.successStatus) continue;

    const parsedExpression = parseAsterisks(expression.modelExpression, 'js').replaceAll(' ', '');

    const params = expression.parametersList.reduce((parameters, curr) => {
      parameters[curr.name] = curr.value;
      return parameters;
    }, {} as GenericObject<number>);

    const result = calculatePoints(parsedExpression, params, xMin, xMax);
   
    parsedExpressions.push({
      id: expression.modelId,
      name: expression.modelName,
      points: result,
    });
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

  for (let [x, y] of points) {
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  }

  if (!Number.isFinite(xMin) || !Number.isFinite(xMax) || !Number.isFinite(yMin) || !Number.isFinite(yMax)) return [0, 0, 0, 0];
  return [xMin, xMax, yMin, yMax];
}
