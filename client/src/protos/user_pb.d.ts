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

export class NewUserRequest extends jspb.Message {
  getLogin(): string;
  setLogin(value: string): NewUserRequest;

  getPassword(): string;
  setPassword(value: string): NewUserRequest;

  getRole(): Role;
  setRole(value: Role): NewUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewUserRequest): NewUserRequest.AsObject;
  static serializeBinaryToWriter(message: NewUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewUserRequest;
  static deserializeBinaryFromReader(message: NewUserRequest, reader: jspb.BinaryReader): NewUserRequest;
}

export namespace NewUserRequest {
  export type AsObject = {
    login: string,
    password: string,
    role: Role,
  }
}

export class UserPrivilegeRequest extends jspb.Message {
  getUserid(): UserId | undefined;
  setUserid(value?: UserId): UserPrivilegeRequest;
  hasUserid(): boolean;
  clearUserid(): UserPrivilegeRequest;

  getNewrole(): Role;
  setNewrole(value: Role): UserPrivilegeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserPrivilegeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserPrivilegeRequest): UserPrivilegeRequest.AsObject;
  static serializeBinaryToWriter(message: UserPrivilegeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserPrivilegeRequest;
  static deserializeBinaryFromReader(message: UserPrivilegeRequest, reader: jspb.BinaryReader): UserPrivilegeRequest;
}

export namespace UserPrivilegeRequest {
  export type AsObject = {
    userid?: UserId.AsObject,
    newrole: Role,
  }
}

export class UserResponse extends jspb.Message {
  getId(): number;
  setId(value: number): UserResponse;

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
  }
}

export class UsersResponse extends jspb.Message {
  getUsersList(): Array<UserResponse>;
  setUsersList(value: Array<UserResponse>): UsersResponse;
  clearUsersList(): UsersResponse;
  addUsers(value?: UserResponse, index?: number): UserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UsersResponse): UsersResponse.AsObject;
  static serializeBinaryToWriter(message: UsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsersResponse;
  static deserializeBinaryFromReader(message: UsersResponse, reader: jspb.BinaryReader): UsersResponse;
}

export namespace UsersResponse {
  export type AsObject = {
    usersList: Array<UserResponse.AsObject>,
  }
}

export enum Role { 
  BASIC_USER = 0,
  ADMIN = 1,
}
