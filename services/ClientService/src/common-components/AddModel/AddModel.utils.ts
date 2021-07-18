import { illegalCharacters } from '../../utils/dataParsing';

export function extraExprValidation(expression: string, parameters: string[], modelName: string): string[] {
  const errors: string[] = [];
  if (!expression.split('').includes('x')) errors.push('Expression must be written in terms of x');
  if (!parameters.length) errors.push('No parameters were detected');
  if (illegalCharacters(expression)) errors.push('Illegal parameters, parameter must be a single character');
  if (!modelName) errors.push('Model Name field is mandatory');
  return errors;
}