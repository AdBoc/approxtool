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

export class UserResponse extends jspb.Message {
  getId(): number;
  setId(value: number): UserResponse;

  getUsername(): string;
  setUsername(value: string): UserResponse;

  getEmail(): string;
  setEmail(value: string): UserResponse;

  getStatus(): Role;
  setStatus(value: Role): UserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserResponse): UserResponse.AsObject;
  static serializeBinaryToWriter(message: UserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserResponse;
  static deserializeBinaryFromReader(message: UserResponse, reader: jspb.BinaryReader): UserResponse;
}

export namespace UserResponse {
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
  getUsersList(): Array<UserResponse>;
  setUsersList(value: Array<UserResponse>): GetUsersResponse;
  clearUsersList(): GetUsersResponse;
  addUsers(value?: UserResponse, index?: number): UserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUsersResponse): GetUsersResponse.AsObject;
  static serializeBinaryToWriter(message: GetUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUsersResponse;
  static deserializeBinaryFromReader(message: GetUsersResponse, reader: jspb.BinaryReader): GetUsersResponse;
}

export namespace GetUsersResponse {
  export type AsObject = {
    usersList: Array<UserResponse.AsObject>,
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

export class SearchRequest extends jspb.Message {
  getSearchquery(): string;
  setSearchquery(value: string): SearchRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchRequest): SearchRequest.AsObject;
  static serializeBinaryToWriter(message: SearchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchRequest;
  static deserializeBinaryFromReader(message: SearchRequest, reader: jspb.BinaryReader): SearchRequest;
}

export namespace SearchRequest {
  export type AsObject = {
    searchquery: string,
  }
}

export class SearchResponse extends jspb.Message {
  getUsersList(): Array<UserResponse>;
  setUsersList(value: Array<UserResponse>): SearchResponse;
  clearUsersList(): SearchResponse;
  addUsers(value?: UserResponse, index?: number): UserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchResponse): SearchResponse.AsObject;
  static serializeBinaryToWriter(message: SearchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchResponse;
  static deserializeBinaryFromReader(message: SearchResponse, reader: jspb.BinaryReader): SearchResponse;
}

export namespace SearchResponse {
  export type AsObject = {
    usersList: Array<UserResponse.AsObject>,
  }
}

export enum Role { 
  BASIC_USER = 0,
  ADMIN = 1,
}
