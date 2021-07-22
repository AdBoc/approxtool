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

  methodInfoRefreshToken = new grpcWeb.AbstractClientBase.MethodInfo(
    authservice_pb.RefreshResponse,
    (request: authservice_pb.RefreshRequest) => {
      return request.serializeBinary();
    },
    authservice_pb.RefreshResponse.deserializeBinary
  );

  refreshToken(
    request: authservice_pb.RefreshRequest,
    metadata: grpcWeb.Metadata | null): Promise<authservice_pb.RefreshResponse>;

  refreshToken(
    request: authservice_pb.RefreshRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: authservice_pb.RefreshResponse) => void): grpcWeb.ClientReadableStream<authservice_pb.RefreshResponse>;

  refreshToken(
    request: authservice_pb.RefreshRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
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

  methodInfoGetSession = new grpcWeb.AbstractClientBase.MethodInfo(
    authservice_pb.GetSessionResponse,
    (request: authservice_pb.GetSessionRequest) => {
      return request.serializeBinary();
    },
    authservice_pb.GetSessionResponse.deserializeBinary
  );

  getSession(
    request: authservice_pb.GetSessionRequest,
    metadata: grpcWeb.Metadata | null): Promise<authservice_pb.GetSessionResponse>;

  getSession(
    request: authservice_pb.GetSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: authservice_pb.GetSessionResponse) => void): grpcWeb.ClientReadableStream<authservice_pb.GetSessionResponse>;

  getSession(
    request: authservice_pb.GetSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: authservice_pb.GetSessionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.AuthService/GetSession',
        request,
        metadata || {},
        this.methodInfoGetSession,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.AuthService/GetSession',
    request,
    metadata || {},
    this.methodInfoGetSession);
  }

  methodInfoLogin = new grpcWeb.AbstractClientBase.MethodInfo(
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
    callback: (err: grpcWeb.Error,
               response: authservice_pb.LoginResponse) => void): grpcWeb.ClientReadableStream<authservice_pb.LoginResponse>;

  login(
    request: authservice_pb.InternalLoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
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

  methodInfoLogout = new grpcWeb.AbstractClientBase.MethodInfo(
    authservice_pb.LogoutResponse,
    (request: authservice_pb.LogoutRequest) => {
      return request.serializeBinary();
    },
    authservice_pb.LogoutResponse.deserializeBinary
  );

  logout(
    request: authservice_pb.LogoutRequest,
    metadata: grpcWeb.Metadata | null): Promise<authservice_pb.LogoutResponse>;

  logout(
    request: authservice_pb.LogoutRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: authservice_pb.LogoutResponse) => void): grpcWeb.ClientReadableStream<authservice_pb.LogoutResponse>;

  logout(
    request: authservice_pb.LogoutRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: authservice_pb.LogoutResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.AuthService/Logout',
        request,
        metadata || {},
        this.methodInfoLogout,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.AuthService/Logout',
    request,
    metadata || {},
    this.methodInfoLogout);
  }

}

