import { GenericObject } from "../types";

/*API*/
export const API_CLIENT = 'http://localhost:8080';

/*REGEXES*/
export const csvRegex = /^.*\.csv$/gm;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/*SPLIT CHARS*/
export const csvSplitter = /\r?\n|,/;
export const pasteSplitter = /\r?\n|,|\t/;
export const splitExpressionChars = ['+', '-', '*', '^', '**', '(', ')', '/', ' '];
export const allowedMathSymbols: GenericObject<boolean> = {
  acos: true,
  acosh: true,
  asin: true,
  asinh: true,
  atan: true,
  atan2: true,
  atanh: true,
  cos: true,
  cosh: true,
  exp: true,
  factorial: true,
  log: true,
  log10: true,
  pow: true,
  radians: true,
  sin: true,
  sinh: true,
  sqrt: true,
  tan: true,
  tanh: true,
  ln: true,
};

/*APP ERRORS*/
export enum Errors {
  ERR_CSV_EXT = 'Wrong File Extension.',
  ERR_PARSING_FILE = 'Problem parsing input file.'
}
