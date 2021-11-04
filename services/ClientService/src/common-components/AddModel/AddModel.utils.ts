import { searchForIllegalChars } from '../../utils/dataParsing';

export function expressionValidation(expression: string, parameters: string[], modelName: string): string[] {
  const errors: string[] = [];
  if (!expression.split('').includes('x')) errors.push('Expression must be written in terms of x');
  if (!parameters.length) errors.push('No parameters were detected');
  if (searchForIllegalChars(expression)) errors.push('Illegal parameters, parameter must be a single character');
  if (!modelName) errors.push('Model Name field is mandatory');
  return errors;
}