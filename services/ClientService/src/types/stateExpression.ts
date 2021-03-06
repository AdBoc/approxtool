import { Point } from './pointCoordinate';
import { Model } from '../protos/modelservice_pb';

export interface ExpressionParameter {
  paramName: string,
  paramValue: number,
  minBound: number,
  maxBound: number,
}

export interface FitStateExpression extends Model.AsObject {
  isSelected: boolean,
  params: ExpressionParameter[],
}

export interface StateExpression extends Model.AsObject { isSelected: boolean }

export type NewExpression = Omit<Model.AsObject, 'id'>;

export interface GraphExpression {
  id: number;
  name: string;
  points: Point[];
}
