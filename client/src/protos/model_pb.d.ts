import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class UserId extends jspb.Message {
  getId(): number;
  setId(value: number): UserId;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserId.AsObject;
  static toObject(includeInstance: boolean, msg: UserId): UserId.AsObject;
  static serializeBinaryToWriter(message: UserId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserId;
  static deserializeBinaryFromReader(message: UserId, reader: jspb.BinaryReader): UserId;
}

export namespace UserId {
  export type AsObject = {
    id: number,
  }
}

export class Model extends jspb.Message {
  getModel(): string;
  setModel(value: string): Model;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Model.AsObject;
  static toObject(includeInstance: boolean, msg: Model): Model.AsObject;
  static serializeBinaryToWriter(message: Model, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Model;
  static deserializeBinaryFromReader(message: Model, reader: jspb.BinaryReader): Model;
}

export namespace Model {
  export type AsObject = {
    model: string,
  }
}

export class Models extends jspb.Message {
  getModelsList(): Array<Model>;
  setModelsList(value: Array<Model>): Models;
  clearModelsList(): Models;
  addModels(value?: Model, index?: number): Model;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Models.AsObject;
  static toObject(includeInstance: boolean, msg: Models): Models.AsObject;
  static serializeBinaryToWriter(message: Models, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Models;
  static deserializeBinaryFromReader(message: Models, reader: jspb.BinaryReader): Models;
}

export namespace Models {
  export type AsObject = {
    modelsList: Array<Model.AsObject>,
  }
}

export class NewModelRequest extends jspb.Message {
  getModel(): Model | undefined;
  setModel(value?: Model): NewModelRequest;
  hasModel(): boolean;
  clearModel(): NewModelRequest;

  getUserid(): UserId | undefined;
  setUserid(value?: UserId): NewModelRequest;
  hasUserid(): boolean;
  clearUserid(): NewModelRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewModelRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewModelRequest): NewModelRequest.AsObject;
  static serializeBinaryToWriter(message: NewModelRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewModelRequest;
  static deserializeBinaryFromReader(message: NewModelRequest, reader: jspb.BinaryReader): NewModelRequest;
}

export namespace NewModelRequest {
  export type AsObject = {
    model?: Model.AsObject,
    userid?: UserId.AsObject,
  }
}

export class ModelId extends jspb.Message {
  getId(): number;
  setId(value: number): ModelId;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModelId.AsObject;
  static toObject(includeInstance: boolean, msg: ModelId): ModelId.AsObject;
  static serializeBinaryToWriter(message: ModelId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModelId;
  static deserializeBinaryFromReader(message: ModelId, reader: jspb.BinaryReader): ModelId;
}

export namespace ModelId {
  export type AsObject = {
    id: number,
  }
}

