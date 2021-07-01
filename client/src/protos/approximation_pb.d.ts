import * as jspb from 'google-protobuf'



export class Parameter extends jspb.Message {
  getName(): string;
  setName(value: string): Parameter;

  getValue(): number;
  setValue(value: number): Parameter;

  getStderr(): number;
  setStderr(value: number): Parameter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Parameter.AsObject;
  static toObject(includeInstance: boolean, msg: Parameter): Parameter.AsObject;
  static serializeBinaryToWriter(message: Parameter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Parameter;
  static deserializeBinaryFromReader(message: Parameter, reader: jspb.BinaryReader): Parameter;
}

export namespace Parameter {
  export type AsObject = {
    name: string,
    value: number,
    stderr: number,
  }
}

export class FitResult extends jspb.Message {
  getModelId(): number;
  setModelId(value: number): FitResult;

  getSuccessStatus(): boolean;
  setSuccessStatus(value: boolean): FitResult;

  getModelName(): string;
  setModelName(value: string): FitResult;

  getModelExpression(): string;
  setModelExpression(value: string): FitResult;

  getR(): number;
  setR(value: number): FitResult;

  getRSqrt(): number;
  setRSqrt(value: number): FitResult;

  getAic(): number;
  setAic(value: number): FitResult;

  getBic(): number;
  setBic(value: number): FitResult;

  getFog(): number;
  setFog(value: number): FitResult;

  getMeanOfX(): number;
  setMeanOfX(value: number): FitResult;

  getMeanOfY(): number;
  setMeanOfY(value: number): FitResult;

  getChiSqrt(): number;
  setChiSqrt(value: number): FitResult;

  getReducedChiSqrt(): number;
  setReducedChiSqrt(value: number): FitResult;

  getDataPoints(): number;
  setDataPoints(value: number): FitResult;

  getFittingMethod(): string;
  setFittingMethod(value: string): FitResult;

  getParametersList(): Array<Parameter>;
  setParametersList(value: Array<Parameter>): FitResult;
  clearParametersList(): FitResult;
  addParameters(value?: Parameter, index?: number): Parameter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FitResult.AsObject;
  static toObject(includeInstance: boolean, msg: FitResult): FitResult.AsObject;
  static serializeBinaryToWriter(message: FitResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FitResult;
  static deserializeBinaryFromReader(message: FitResult, reader: jspb.BinaryReader): FitResult;
}

export namespace FitResult {
  export type AsObject = {
    modelId: number,
    successStatus: boolean,
    modelName: string,
    modelExpression: string,
    r: number,
    rSqrt: number,
    aic: number,
    bic: number,
    fog: number,
    meanOfX: number,
    meanOfY: number,
    chiSqrt: number,
    reducedChiSqrt: number,
    dataPoints: number,
    fittingMethod: string,
    parametersList: Array<Parameter.AsObject>,
  }
}

export class RequestExpressionParameter extends jspb.Message {
  getParamname(): string;
  setParamname(value: string): RequestExpressionParameter;

  getParamvalue(): number;
  setParamvalue(value: number): RequestExpressionParameter;

  getMinbound(): number;
  setMinbound(value: number): RequestExpressionParameter;

  getMaxbound(): number;
  setMaxbound(value: number): RequestExpressionParameter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestExpressionParameter.AsObject;
  static toObject(includeInstance: boolean, msg: RequestExpressionParameter): RequestExpressionParameter.AsObject;
  static serializeBinaryToWriter(message: RequestExpressionParameter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestExpressionParameter;
  static deserializeBinaryFromReader(message: RequestExpressionParameter, reader: jspb.BinaryReader): RequestExpressionParameter;
}

export namespace RequestExpressionParameter {
  export type AsObject = {
    paramname: string,
    paramvalue: number,
    minbound: number,
    maxbound: number,
  }
}

export class Expression extends jspb.Message {
  getId(): number;
  setId(value: number): Expression;

  getName(): string;
  setName(value: string): Expression;

  getExpression(): string;
  setExpression(value: string): Expression;

  getParametersList(): Array<RequestExpressionParameter>;
  setParametersList(value: Array<RequestExpressionParameter>): Expression;
  clearParametersList(): Expression;
  addParameters(value?: RequestExpressionParameter, index?: number): RequestExpressionParameter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Expression.AsObject;
  static toObject(includeInstance: boolean, msg: Expression): Expression.AsObject;
  static serializeBinaryToWriter(message: Expression, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Expression;
  static deserializeBinaryFromReader(message: Expression, reader: jspb.BinaryReader): Expression;
}

export namespace Expression {
  export type AsObject = {
    id: number,
    name: string,
    expression: string,
    parametersList: Array<RequestExpressionParameter.AsObject>,
  }
}

export class CurveFitRequest extends jspb.Message {
  getXDataList(): Array<number>;
  setXDataList(value: Array<number>): CurveFitRequest;
  clearXDataList(): CurveFitRequest;
  addXData(value: number, index?: number): CurveFitRequest;

  getYDataList(): Array<number>;
  setYDataList(value: Array<number>): CurveFitRequest;
  clearYDataList(): CurveFitRequest;
  addYData(value: number, index?: number): CurveFitRequest;

  getExpressionsList(): Array<Expression>;
  setExpressionsList(value: Array<Expression>): CurveFitRequest;
  clearExpressionsList(): CurveFitRequest;
  addExpressions(value?: Expression, index?: number): Expression;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurveFitRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CurveFitRequest): CurveFitRequest.AsObject;
  static serializeBinaryToWriter(message: CurveFitRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurveFitRequest;
  static deserializeBinaryFromReader(message: CurveFitRequest, reader: jspb.BinaryReader): CurveFitRequest;
}

export namespace CurveFitRequest {
  export type AsObject = {
    xDataList: Array<number>,
    yDataList: Array<number>,
    expressionsList: Array<Expression.AsObject>,
  }
}

export class CurveFitResult extends jspb.Message {
  getFitResultList(): Array<FitResult>;
  setFitResultList(value: Array<FitResult>): CurveFitResult;
  clearFitResultList(): CurveFitResult;
  addFitResult(value?: FitResult, index?: number): FitResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurveFitResult.AsObject;
  static toObject(includeInstance: boolean, msg: CurveFitResult): CurveFitResult.AsObject;
  static serializeBinaryToWriter(message: CurveFitResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurveFitResult;
  static deserializeBinaryFromReader(message: CurveFitResult, reader: jspb.BinaryReader): CurveFitResult;
}

export namespace CurveFitResult {
  export type AsObject = {
    fitResultList: Array<FitResult.AsObject>,
  }
}

