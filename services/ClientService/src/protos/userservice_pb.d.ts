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

  getRole(): string;
  setRole(value: string): UserResponse;

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
    role: string,
  }
}

export class NewUserRequest extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): NewUserRequest;

  getUsername(): string;
  setUsername(value: string): NewUserRequest;

  getPassword(): string;
  setPassword(value: string): NewUserRequest;

  getEmail(): string;
  setEmail(value: string): NewUserRequest;

  getRole(): string;
  setRole(value: string): NewUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewUserRequest): NewUserRequest.AsObject;
  static serializeBinaryToWriter(message: NewUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewUserRequest;
  static deserializeBinaryFromReader(message: NewUserRequest, reader: jspb.BinaryReader): NewUserRequest;
}

export namespace NewUserRequest {
  export type AsObject = {
    accessToken: string,
    username: string,
    password: string,
    email: string,
    role: string,
  }
}

export class InternalNewUserRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): InternalNewUserRequest;

  getPassword(): string;
  setPassword(value: string): InternalNewUserRequest;

  getEmail(): string;
  setEmail(value: string): InternalNewUserRequest;

  getRole(): string;
  setRole(value: string): InternalNewUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalNewUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InternalNewUserRequest): InternalNewUserRequest.AsObject;
  static serializeBinaryToWriter(message: InternalNewUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalNewUserRequest;
  static deserializeBinaryFromReader(message: InternalNewUserRequest, reader: jspb.BinaryReader): InternalNewUserRequest;
}

export namespace InternalNewUserRequest {
  export type AsObject = {
    username: string,
    password: string,
    email: string,
    role: string,
  }
}

export class ChangePrivilegeRequest extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): ChangePrivilegeRequest;

  getUserid(): number;
  setUserid(value: number): ChangePrivilegeRequest;

  getNewrole(): string;
  setNewrole(value: string): ChangePrivilegeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePrivilegeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePrivilegeRequest): ChangePrivilegeRequest.AsObject;
  static serializeBinaryToWriter(message: ChangePrivilegeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePrivilegeRequest;
  static deserializeBinaryFromReader(message: ChangePrivilegeRequest, reader: jspb.BinaryReader): ChangePrivilegeRequest;
}

export namespace ChangePrivilegeRequest {
  export type AsObject = {
    accessToken: string,
    userid: number,
    newrole: string,
  }
}

export class InternalChangePrivilegeRequest extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): InternalChangePrivilegeRequest;

  getNewrole(): string;
  setNewrole(value: string): InternalChangePrivilegeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalChangePrivilegeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InternalChangePrivilegeRequest): InternalChangePrivilegeRequest.AsObject;
  static serializeBinaryToWriter(message: InternalChangePrivilegeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalChangePrivilegeRequest;
  static deserializeBinaryFromReader(message: InternalChangePrivilegeRequest, reader: jspb.BinaryReader): InternalChangePrivilegeRequest;
}

export namespace InternalChangePrivilegeRequest {
  export type AsObject = {
    userid: number,
    newrole: string,
  }
}

export class DeleteUserRequest extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): DeleteUserRequest;

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
    accessToken: string,
    id: number,
  }
}

export class InternalDeleteUserRequest extends jspb.Message {
  getId(): number;
  setId(value: number): InternalDeleteUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalDeleteUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InternalDeleteUserRequest): InternalDeleteUserRequest.AsObject;
  static serializeBinaryToWriter(message: InternalDeleteUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalDeleteUserRequest;
  static deserializeBinaryFromReader(message: InternalDeleteUserRequest, reader: jspb.BinaryReader): InternalDeleteUserRequest;
}

export namespace InternalDeleteUserRequest {
  export type AsObject = {
    id: number,
  }
}

export class VerifyPasswordRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): VerifyPasswordRequest;

  getPassword(): string;
  setPassword(value: string): VerifyPasswordRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyPasswordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyPasswordRequest): VerifyPasswordRequest.AsObject;
  static serializeBinaryToWriter(message: VerifyPasswordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyPasswordRequest;
  static deserializeBinaryFromReader(message: VerifyPasswordRequest, reader: jspb.BinaryReader): VerifyPasswordRequest;
}

export namespace VerifyPasswordRequest {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class VerifyPasswordResponse extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): VerifyPasswordResponse;

  getUsername(): string;
  setUsername(value: string): VerifyPasswordResponse;

  getRole(): string;
  setRole(value: string): VerifyPasswordResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyPasswordResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyPasswordResponse): VerifyPasswordResponse.AsObject;
  static serializeBinaryToWriter(message: VerifyPasswordResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyPasswordResponse;
  static deserializeBinaryFromReader(message: VerifyPasswordResponse, reader: jspb.BinaryReader): VerifyPasswordResponse;
}

export namespace VerifyPasswordResponse {
  export type AsObject = {
    userId: number,
    username: string,
    role: string,
  }
}

export class SearchRequest extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): SearchRequest;

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
    accessToken: string,
    searchquery: string,
  }
}

export class InternalSearchRequest extends jspb.Message {
  getSearchquery(): string;
  setSearchquery(value: string): InternalSearchRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalSearchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InternalSearchRequest): InternalSearchRequest.AsObject;
  static serializeBinaryToWriter(message: InternalSearchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalSearchRequest;
  static deserializeBinaryFromReader(message: InternalSearchRequest, reader: jspb.BinaryReader): InternalSearchRequest;
}

export namespace InternalSearchRequest {
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

export class GetUserByIdRequest extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): GetUserByIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserByIdRequest): GetUserByIdRequest.AsObject;
  static serializeBinaryToWriter(message: GetUserByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserByIdRequest;
  static deserializeBinaryFromReader(message: GetUserByIdRequest, reader: jspb.BinaryReader): GetUserByIdRequest;
}

export namespace GetUserByIdRequest {
  export type AsObject = {
    userid: number,
  }
}

export class GetUserByIdResponse extends jspb.Message {
  getRole(): string;
  setRole(value: string): GetUserByIdResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserByIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserByIdResponse): GetUserByIdResponse.AsObject;
  static serializeBinaryToWriter(message: GetUserByIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserByIdResponse;
  static deserializeBinaryFromReader(message: GetUserByIdResponse, reader: jspb.BinaryReader): GetUserByIdResponse;
}

export namespace GetUserByIdResponse {
  export type AsObject = {
    role: string,
  }
}

export class InternalChangePasswordRequest extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): InternalChangePasswordRequest;

  getNewpassword(): string;
  setNewpassword(value: string): InternalChangePasswordRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalChangePasswordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InternalChangePasswordRequest): InternalChangePasswordRequest.AsObject;
  static serializeBinaryToWriter(message: InternalChangePasswordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalChangePasswordRequest;
  static deserializeBinaryFromReader(message: InternalChangePasswordRequest, reader: jspb.BinaryReader): InternalChangePasswordRequest;
}

export namespace InternalChangePasswordRequest {
  export type AsObject = {
    userid: number,
    newpassword: string,
  }
}

export class ChangePasswordRequest extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): ChangePasswordRequest;

  getUserid(): number;
  setUserid(value: number): ChangePasswordRequest;

  getNewpassword(): string;
  setNewpassword(value: string): ChangePasswordRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePasswordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePasswordRequest): ChangePasswordRequest.AsObject;
  static serializeBinaryToWriter(message: ChangePasswordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePasswordRequest;
  static deserializeBinaryFromReader(message: ChangePasswordRequest, reader: jspb.BinaryReader): ChangePasswordRequest;
}

export namespace ChangePasswordRequest {
  export type AsObject = {
    accessToken: string,
    userid: number,
    newpassword: string,
  }
}

