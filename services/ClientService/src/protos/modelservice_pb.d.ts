import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class Model extends jspb.Message {
  getId(): number;
  setId(value: number): Model;

  getName(): string;
  setName(value: string): Model;

  getExpression(): string;
  setExpression(value: string): Model;

  getLexexpression(): string;
  setLexexpression(value: string): Model;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Model.AsObject;
  static toObject(includeInstance: boolean, msg: Model): Model.AsObject;
  static serializeBinaryToWriter(message: Model, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Model;
  static deserializeBinaryFromReader(message: Model, reader: jspb.BinaryReader): Model;
}

export namespace Model {
  export type AsObject = {
    id: number,
    name: string,
    expression: string,
    lexexpression: string,
  }
}

export class GetModelsRequest extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): GetModelsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetModelsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetModelsRequest): GetModelsRequest.AsObject;
  static serializeBinaryToWriter(message: GetModelsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetModelsRequest;
  static deserializeBinaryFromReader(message: GetModelsRequest, reader: jspb.BinaryReader): GetModelsRequest;
}

export namespace GetModelsRequest {
  export type AsObject = {
    userid: number,
  }
}

export class GetModelsResponse extends jspb.Message {
  getModelsList(): Array<Model>;
  setModelsList(value: Array<Model>): GetModelsResponse;
  clearModelsList(): GetModelsResponse;
  addModels(value?: Model, index?: number): Model;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetModelsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetModelsResponse): GetModelsResponse.AsObject;
  static serializeBinaryToWriter(message: GetModelsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetModelsResponse;
  static deserializeBinaryFromReader(message: GetModelsResponse, reader: jspb.BinaryReader): GetModelsResponse;
}

export namespace GetModelsResponse {
  export type AsObject = {
    modelsList: Array<Model.AsObject>,
  }
}

export class NewModelRequest extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): NewModelRequest;

  getName(): string;
  setName(value: string): NewModelRequest;

  getExpression(): string;
  setExpression(value: string): NewModelRequest;

  getLexexpression(): string;
  setLexexpression(value: string): NewModelRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewModelRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewModelRequest): NewModelRequest.AsObject;
  static serializeBinaryToWriter(message: NewModelRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewModelRequest;
  static deserializeBinaryFromReader(message: NewModelRequest, reader: jspb.BinaryReader): NewModelRequest;
}

export namespace NewModelRequest {
  export type AsObject = {
    userid: number,
    name: string,
    expression: string,
    lexexpression: string,
  }
}

export class NewModelResponse extends jspb.Message {
  getId(): number;
  setId(value: number): NewModelResponse;

  getName(): string;
  setName(value: string): NewModelResponse;

  getExpression(): string;
  setExpression(value: string): NewModelResponse;

  getLexexpression(): string;
  setLexexpression(value: string): NewModelResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewModelResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewModelResponse): NewModelResponse.AsObject;
  static serializeBinaryToWriter(message: NewModelResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewModelResponse;
  static deserializeBinaryFromReader(message: NewModelResponse, reader: jspb.BinaryReader): NewModelResponse;
}

export namespace NewModelResponse {
  export type AsObject = {
    id: number,
    name: string,
    expression: string,
    lexexpression: string,
  }
}

export class DeleteModelRequest extends jspb.Message {
  getModelid(): number;
  setModelid(value: number): DeleteModelRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteModelRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteModelRequest): DeleteModelRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteModelRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteModelRequest;
  static deserializeBinaryFromReader(message: DeleteModelRequest, reader: jspb.BinaryReader): DeleteModelRequest;
}

export namespace DeleteModelRequest {
  export type AsObject = {
    modelid: number,
  }
}

