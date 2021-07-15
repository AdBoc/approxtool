import {
  allowedMathSymbols,
  csvSplitter,
  pasteSplitter,
  splitExpressionChars
} from '../constants/constants';
import { Point } from '../types/pointCoordinate';

export function parseCSVText(text: string): number[] {
  return text.split(csvSplitter).map(point => parseFloat(point)).filter(point => !isNaN(point));
}

export function parsePasteText(text: string): number[] {
  return text.split(pasteSplitter).map(point => parseFloat(point)).filter(point => !isNaN(point));
}

function splitStringByArray(str: string, tokens: string[]): string[] {
  const tempChar = tokens[0];
  for (let i = 1; i < tokens.length; i++) {
    str = str.split(tokens[i]).join(tempChar);
  }
  return str.split(tempChar);
}

function uniqueFilter(value: string | number, index: number, self: (string | number)[]) {
  return self.indexOf(value) === index;
}

export function expressionParams(expression: string): string[] {
  return splitStringByArray(expression, splitExpressionChars)
    .filter(param => param !== 'x' && Boolean(param) && param.length === 1 && isNaN(Number(param)))
    .filter(uniqueFilter);
}

export function illegalCharacters(expression: string) {
  const words = splitStringByArray(expression, splitExpressionChars)
    .filter(param => param.length !== 1 && Boolean(param) && isNaN(Number(param)));
  return words.some((word) => !allowedMathSymbols[word]);
}

export function parseAsterisks(expression: string, toJs = true) {
  if (toJs) return expression.replaceAll('**', '^');
  else return expression.replace('^', '**');
}

//to [[xvals], [yvals]]
export function parsePointsForRequest(data: number[]): [number[], number[]] {
  const xData: number[] = [];
  const yData: number[] = [];

  let toFirstArr = true;

  for (let i = 0; i <= data.length - 1; i++) {
    toFirstArr ? xData.push(data[i]) : yData.push(data[i]);
    toFirstArr = !toFirstArr;
  }

  return [xData, yData];
}

/**
 * calculate points to draw on graph from string expression
 * @param points
 * @return [[x],[y]] points are returned in successful calculation, undefined is returned on error
 */
export function parsePointsForGraph(points: number[]): Point[] {
  const fitPoints: Point[] = [];

  for (let i = 0; i <= points.length; i += 2) {
    fitPoints.push([points[i], points[i + 1]]);
  }

  //TODO: TWO LAST POINTS ARE UNDEFINED

  return fitPoints;
}