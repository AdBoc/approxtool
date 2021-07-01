import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class GetUserRequest extends jspb.Message {
  getId(): number;
  setId(value: number): GetUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserRequest): GetUserRequest.AsObject;
  static serializeBinaryToWriter(message: GetUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserRequest;
  static deserializeBinaryFromReader(message: GetUserRequest, reader: jspb.BinaryReader): GetUserRequest;
}

export namespace GetUserRequest {
  export type AsObject = {
    id: number,
  }
}

export class GetUserResponse extends jspb.Message {
  getId(): number;
  setId(value: number): GetUserResponse;

  getUsername(): string;
  setUsername(value: string): GetUserResponse;

  getEmail(): string;
  setEmail(value: string): GetUserResponse;

  getStatus(): Role;
  setStatus(value: Role): GetUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserResponse): GetUserResponse.AsObject;
  static serializeBinaryToWriter(message: GetUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserResponse;
  static deserializeBinaryFromReader(message: GetUserResponse, reader: jspb.BinaryReader): GetUserResponse;
}

export namespace GetUserResponse {
  export type AsObject = {
    id: number,
    username: string,
    email: string,
    status: Role,
  }
}

export class NewUserRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): NewUserRequest;

  getPassword(): string;
  setPassword(value: string): NewUserRequest;

  getEmail(): string;
  setEmail(value: string): NewUserRequest;

  getStatus(): Role;
  setStatus(value: Role): NewUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewUserRequest): NewUserRequest.AsObject;
  static serializeBinaryToWriter(message: NewUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewUserRequest;
  static deserializeBinaryFromReader(message: NewUserRequest, reader: jspb.BinaryReader): NewUserRequest;
}

export namespace NewUserRequest {
  export type AsObject = {
    username: string,
    password: string,
    email: string,
    status: Role,
  }
}

export class ChangePrivilegeRequest extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): ChangePrivilegeRequest;

  getNewstatus(): Role;
  setNewstatus(value: Role): ChangePrivilegeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePrivilegeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePrivilegeRequest): ChangePrivilegeRequest.AsObject;
  static serializeBinaryToWriter(message: ChangePrivilegeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePrivilegeRequest;
  static deserializeBinaryFromReader(message: ChangePrivilegeRequest, reader: jspb.BinaryReader): ChangePrivilegeRequest;
}

export namespace ChangePrivilegeRequest {
  export type AsObject = {
    userid: number,
    newstatus: Role,
  }
}

export class GetUsersResponse extends jspb.Message {
  getUsersList(): Array<GetUserResponse>;
  setUsersList(value: Array<GetUserResponse>): GetUsersResponse;
  clearUsersList(): GetUsersResponse;
  addUsers(value?: GetUserResponse, index?: number): GetUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUsersResponse): GetUsersResponse.AsObject;
  static serializeBinaryToWriter(message: GetUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUsersResponse;
  static deserializeBinaryFromReader(message: GetUsersResponse, reader: jspb.BinaryReader): GetUsersResponse;
}

export namespace GetUsersResponse {
  export type AsObject = {
    usersList: Array<GetUserResponse.AsObject>,
  }
}

export class DeleteUserRequest extends jspb.Message {
  getId(): number;
  setId(value: number): DeleteUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteUserRequest): DeleteUserRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteUserRequest;
  static deserializeBinaryFromReader(message: DeleteUserRequest, reader: jspb.BinaryReader): DeleteUserRequest;
}

export namespace DeleteUserRequest {
  export type AsObject = {
    id: number,
  }
}

export class CompareCredentialsRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): CompareCredentialsRequest;

  getPassword(): string;
  setPassword(value: string): CompareCredentialsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CompareCredentialsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CompareCredentialsRequest): CompareCredentialsRequest.AsObject;
  static serializeBinaryToWriter(message: CompareCredentialsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CompareCredentialsRequest;
  static deserializeBinaryFromReader(message: CompareCredentialsRequest, reader: jspb.BinaryReader): CompareCredentialsRequest;
}

export namespace CompareCredentialsRequest {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export enum Role { 
  BASIC_USER = 0,
  ADMIN = 1,
}
