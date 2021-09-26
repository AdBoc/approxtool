import * as jspb from 'google-protobuf'



export class RefreshRequest extends jspb.Message {
  getRefreshToken(): string;
  setRefreshToken(value: string): RefreshRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RefreshRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RefreshRequest): RefreshRequest.AsObject;
  static serializeBinaryToWriter(message: RefreshRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RefreshRequest;
  static deserializeBinaryFromReader(message: RefreshRequest, reader: jspb.BinaryReader): RefreshRequest;
}

export namespace RefreshRequest {
  export type AsObject = {
    refreshToken: string,
  }
}

export class InternalRefreshRequest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): InternalRefreshRequest;

  getUserRole(): string;
  setUserRole(value: string): InternalRefreshRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalRefreshRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InternalRefreshRequest): InternalRefreshRequest.AsObject;
  static serializeBinaryToWriter(message: InternalRefreshRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalRefreshRequest;
  static deserializeBinaryFromReader(message: InternalRefreshRequest, reader: jspb.BinaryReader): InternalRefreshRequest;
}

export namespace InternalRefreshRequest {
  export type AsObject = {
    userId: number,
    userRole: string,
  }
}

export class RefreshResponse extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): RefreshResponse;

  getRefreshToken(): string;
  setRefreshToken(value: string): RefreshResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RefreshResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RefreshResponse): RefreshResponse.AsObject;
  static serializeBinaryToWriter(message: RefreshResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RefreshResponse;
  static deserializeBinaryFromReader(message: RefreshResponse, reader: jspb.BinaryReader): RefreshResponse;
}

export namespace RefreshResponse {
  export type AsObject = {
    accessToken: string,
    refreshToken: string,
  }
}

export class VerifyRefreshTokenRequest extends jspb.Message {
  getRefreshToken(): string;
  setRefreshToken(value: string): VerifyRefreshTokenRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyRefreshTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyRefreshTokenRequest): VerifyRefreshTokenRequest.AsObject;
  static serializeBinaryToWriter(message: VerifyRefreshTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyRefreshTokenRequest;
  static deserializeBinaryFromReader(message: VerifyRefreshTokenRequest, reader: jspb.BinaryReader): VerifyRefreshTokenRequest;
}

export namespace VerifyRefreshTokenRequest {
  export type AsObject = {
    refreshToken: string,
  }
}

export class VerifyRefreshTokenResponse extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): VerifyRefreshTokenResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyRefreshTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyRefreshTokenResponse): VerifyRefreshTokenResponse.AsObject;
  static serializeBinaryToWriter(message: VerifyRefreshTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyRefreshTokenResponse;
  static deserializeBinaryFromReader(message: VerifyRefreshTokenResponse, reader: jspb.BinaryReader): VerifyRefreshTokenResponse;
}

export namespace VerifyRefreshTokenResponse {
  export type AsObject = {
    userid: number,
  }
}

export class VerifyAccessTokenRequest extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): VerifyAccessTokenRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyAccessTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyAccessTokenRequest): VerifyAccessTokenRequest.AsObject;
  static serializeBinaryToWriter(message: VerifyAccessTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyAccessTokenRequest;
  static deserializeBinaryFromReader(message: VerifyAccessTokenRequest, reader: jspb.BinaryReader): VerifyAccessTokenRequest;
}

export namespace VerifyAccessTokenRequest {
  export type AsObject = {
    accessToken: string,
  }
}

export class VerifyAccessTokenResponse extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): VerifyAccessTokenResponse;

  getUserRole(): string;
  setUserRole(value: string): VerifyAccessTokenResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyAccessTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyAccessTokenResponse): VerifyAccessTokenResponse.AsObject;
  static serializeBinaryToWriter(message: VerifyAccessTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyAccessTokenResponse;
  static deserializeBinaryFromReader(message: VerifyAccessTokenResponse, reader: jspb.BinaryReader): VerifyAccessTokenResponse;
}

export namespace VerifyAccessTokenResponse {
  export type AsObject = {
    userId: number,
    userRole: string,
  }
}

export class LoginRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): LoginRequest;

  getPassword(): string;
  setPassword(value: string): LoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class InternalLoginRequest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): InternalLoginRequest;

  getUserRole(): string;
  setUserRole(value: string): InternalLoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalLoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InternalLoginRequest): InternalLoginRequest.AsObject;
  static serializeBinaryToWriter(message: InternalLoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalLoginRequest;
  static deserializeBinaryFromReader(message: InternalLoginRequest, reader: jspb.BinaryReader): InternalLoginRequest;
}

export namespace InternalLoginRequest {
  export type AsObject = {
    userId: number,
    userRole: string,
  }
}

export class LoginResponse extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): LoginResponse;

  getRefreshToken(): string;
  setRefreshToken(value: string): LoginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    accessToken: string,
    refreshToken: string,
  }
}

