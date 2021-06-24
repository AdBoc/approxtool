import * as jspb from 'google-protobuf'



export class CalculationRequest extends jspb.Message {
  getModel(): string;
  setModel(value: string): CalculationRequest;

  getType(): string;
  setType(value: string): CalculationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CalculationRequest): CalculationRequest.AsObject;
  static serializeBinaryToWriter(message: CalculationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculationRequest;
  static deserializeBinaryFromReader(message: CalculationRequest, reader: jspb.BinaryReader): CalculationRequest;
}

export namespace CalculationRequest {
  export type AsObject = {
    model: string,
    type: string,
  }
}

export class CalculationResult extends jspb.Message {
  getResult(): string;
  setResult(value: string): CalculationResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculationResult.AsObject;
  static toObject(includeInstance: boolean, msg: CalculationResult): CalculationResult.AsObject;
  static serializeBinaryToWriter(message: CalculationResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculationResult;
  static deserializeBinaryFromReader(message: CalculationResult, reader: jspb.BinaryReader): CalculationResult;
}

export namespace CalculationResult {
  export type AsObject = {
    result: string,
  }
}

