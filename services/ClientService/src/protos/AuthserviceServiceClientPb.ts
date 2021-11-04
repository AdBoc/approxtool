/**
 * @fileoverview gRPC-Web generated client stub for protos
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as authservice_pb from './authservice_pb';


export class AuthServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoRefreshToken = new grpcWeb.MethodDescriptor(
    '/protos.AuthService/RefreshToken',
    grpcWeb.MethodType.UNARY,
    authservice_pb.InternalRefreshRequest,
    authservice_pb.RefreshResponse,
    (request: authservice_pb.InternalRefreshRequest) => {
      return request.serializeBinary();
    },
    authservice_pb.RefreshResponse.deserializeBinary
  );

  refreshToken(
    request: authservice_pb.InternalRefreshRequest,
    metadata: grpcWeb.Metadata | null): Promise<authservice_pb.RefreshResponse>;

  refreshToken(
    request: authservice_pb.InternalRefreshRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: authservice_pb.RefreshResponse) => void): grpcWeb.ClientReadableStream<authservice_pb.RefreshResponse>;

  refreshToken(
    request: authservice_pb.InternalRefreshRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: authservice_pb.RefreshResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.AuthService/RefreshToken',
        request,
        metadata || {},
        this.methodInfoRefreshToken,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.AuthService/RefreshToken',
    request,
    metadata || {},
    this.methodInfoRefreshToken);
  }

  methodInfoVerifyRefreshToken = new grpcWeb.MethodDescriptor(
    '/protos.AuthService/VerifyRefreshToken',
    grpcWeb.MethodType.UNARY,
    authservice_pb.VerifyRefreshTokenRequest,
    authservice_pb.VerifyRefreshTokenResponse,
    (request: authservice_pb.VerifyRefreshTokenRequest) => {
      return request.serializeBinary();
    },
    authservice_pb.VerifyRefreshTokenResponse.deserializeBinary
  );

  verifyRefreshToken(
    request: authservice_pb.VerifyRefreshTokenRequest,
    metadata: grpcWeb.Metadata | null): Promise<authservice_pb.VerifyRefreshTokenResponse>;

  verifyRefreshToken(
    request: authservice_pb.VerifyRefreshTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: authservice_pb.VerifyRefreshTokenResponse) => void): grpcWeb.ClientReadableStream<authservice_pb.VerifyRefreshTokenResponse>;

  verifyRefreshToken(
    request: authservice_pb.VerifyRefreshTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: authservice_pb.VerifyRefreshTokenResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.AuthService/VerifyRefreshToken',
        request,
        metadata || {},
        this.methodInfoVerifyRefreshToken,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.AuthService/VerifyRefreshToken',
    request,
    metadata || {},
    this.methodInfoVerifyRefreshToken);
  }

  methodInfoVerifyAccessToken = new grpcWeb.MethodDescriptor(
    '/protos.AuthService/VerifyAccessToken',
    grpcWeb.MethodType.UNARY,
    authservice_pb.VerifyAccessTokenRequest,
    authservice_pb.VerifyAccessTokenResponse,
    (request: authservice_pb.VerifyAccessTokenRequest) => {
      return request.serializeBinary();
    },
    authservice_pb.VerifyAccessTokenResponse.deserializeBinary
  );

  verifyAccessToken(
    request: authservice_pb.VerifyAccessTokenRequest,
    metadata: grpcWeb.Metadata | null): Promise<authservice_pb.VerifyAccessTokenResponse>;

  verifyAccessToken(
    request: authservice_pb.VerifyAccessTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: authservice_pb.VerifyAccessTokenResponse) => void): grpcWeb.ClientReadableStream<authservice_pb.VerifyAccessTokenResponse>;

  verifyAccessToken(
    request: authservice_pb.VerifyAccessTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: authservice_pb.VerifyAccessTokenResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.AuthService/VerifyAccessToken',
        request,
        metadata || {},
        this.methodInfoVerifyAccessToken,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.AuthService/VerifyAccessToken',
    request,
    metadata || {},
    this.methodInfoVerifyAccessToken);
  }

  methodInfoLogin = new grpcWeb.MethodDescriptor(
    '/protos.AuthService/Login',
    grpcWeb.MethodType.UNARY,
    authservice_pb.InternalLoginRequest,
    authservice_pb.LoginResponse,
    (request: authservice_pb.InternalLoginRequest) => {
      return request.serializeBinary();
    },
    authservice_pb.LoginResponse.deserializeBinary
  );

  login(
    request: authservice_pb.InternalLoginRequest,
    metadata: grpcWeb.Metadata | null): Promise<authservice_pb.LoginResponse>;

  login(
    request: authservice_pb.InternalLoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: authservice_pb.LoginResponse) => void): grpcWeb.ClientReadableStream<authservice_pb.LoginResponse>;

  login(
    request: authservice_pb.InternalLoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: authservice_pb.LoginResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.AuthService/Login',
        request,
        metadata || {},
        this.methodInfoLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.AuthService/Login',
    request,
    metadata || {},
    this.methodInfoLogin);
  }

}

