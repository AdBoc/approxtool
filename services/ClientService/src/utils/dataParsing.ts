import {
  allowedMathSymbols,
  csvSplitter,
  pasteSplitter,
  splitExpressionChars
} from '../constants/constants';
import { Point } from '../types';

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

export function getExpressionParams(expression: string): string[] {
  return splitStringByArray(expression, splitExpressionChars)
    .filter(param => param !== 'x' && Boolean(param) && param.length === 1 && isNaN(Number(param)))
    .filter(uniqueFilter);
}

export function searchForIllegalChars(expression: string) {
  const words = splitStringByArray(expression, splitExpressionChars)
    .filter(param => param.length !== 1 && Boolean(param) && isNaN(Number(param)));
  return words.some((word) => !allowedMathSymbols[word]);
}

export function parseAsterisks(expression: string, target: 'js' | 'python') {
  if (target === 'js') return expression.replaceAll('**', '^');
  else return expression.replace('^', '**');
}

/**
 * parse points to backend expected format
 * @param points
 * @return [[xValues],[yValues]] - separate arrays with only X and Y values
 */
export function parsePointsForRequest(points: number[]): [number[], number[]] {
  const xData: number[] = [];
  const yData: number[] = [];

  for (let i = 0; i < points.length; i+= 2) {
    xData.push(points[i]);
    yData.push(points[i+1]);
  }

  return [xData, yData];
}

/**
 * calculate points that will be drawn on graph
 * @param points
 * @return [[x],[y]] points are returned in successful calculation, undefined is returned on error
 */
export function parsePointsForGraph(points: number[]): Point[] {
  const fitPoints: Point[] = [];

  for (let i = 0; i < points.length; i += 2) {
    fitPoints.push([points[i], points[i + 1]]);
  }

  return fitPoints;
}