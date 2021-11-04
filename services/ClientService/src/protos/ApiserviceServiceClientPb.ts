/**
 * @fileoverview gRPC-Web generated client stub for protos
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as userservice_pb from './userservice_pb';
import * as approximationservice_pb from './approximationservice_pb';
import * as modelservice_pb from './modelservice_pb';
import * as authservice_pb from './authservice_pb';


export class ApiServiceClient {
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

  methodInfoLogin = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/Login',
    grpcWeb.MethodType.UNARY,
    authservice_pb.LoginRequest,
    authservice_pb.LoginResponse,
    (request: authservice_pb.LoginRequest) => {
      return request.serializeBinary();
    },
    authservice_pb.LoginResponse.deserializeBinary
  );

  login(
    request: authservice_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null): Promise<authservice_pb.LoginResponse>;

  login(
    request: authservice_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: authservice_pb.LoginResponse) => void): grpcWeb.ClientReadableStream<authservice_pb.LoginResponse>;

  login(
    request: authservice_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: authservice_pb.LoginResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/Login',
        request,
        metadata || {},
        this.methodInfoLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/Login',
    request,
    metadata || {},
    this.methodInfoLogin);
  }

  methodInfoRefreshToken = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/RefreshToken',
    grpcWeb.MethodType.UNARY,
    authservice_pb.RefreshRequest,
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
    callback: (err: grpcWeb.RpcError,
               response: authservice_pb.RefreshResponse) => void): grpcWeb.ClientReadableStream<authservice_pb.RefreshResponse>;

  refreshToken(
    request: authservice_pb.RefreshRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: authservice_pb.RefreshResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/RefreshToken',
        request,
        metadata || {},
        this.methodInfoRefreshToken,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/RefreshToken',
    request,
    metadata || {},
    this.methodInfoRefreshToken);
  }

  methodInfoChangeUserPrivilege = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/ChangeUserPrivilege',
    grpcWeb.MethodType.UNARY,
    userservice_pb.ChangePrivilegeRequest,
    google_protobuf_empty_pb.Empty,
    (request: userservice_pb.ChangePrivilegeRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  changeUserPrivilege(
    request: userservice_pb.ChangePrivilegeRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  changeUserPrivilege(
    request: userservice_pb.ChangePrivilegeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  changeUserPrivilege(
    request: userservice_pb.ChangePrivilegeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/ChangeUserPrivilege',
        request,
        metadata || {},
        this.methodInfoChangeUserPrivilege,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/ChangeUserPrivilege',
    request,
    metadata || {},
    this.methodInfoChangeUserPrivilege);
  }

  methodInfoCreateUser = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/CreateUser',
    grpcWeb.MethodType.UNARY,
    userservice_pb.NewUserRequest,
    userservice_pb.UserResponse,
    (request: userservice_pb.NewUserRequest) => {
      return request.serializeBinary();
    },
    userservice_pb.UserResponse.deserializeBinary
  );

  createUser(
    request: userservice_pb.NewUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<userservice_pb.UserResponse>;

  createUser(
    request: userservice_pb.NewUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: userservice_pb.UserResponse) => void): grpcWeb.ClientReadableStream<userservice_pb.UserResponse>;

  createUser(
    request: userservice_pb.NewUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: userservice_pb.UserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/CreateUser',
        request,
        metadata || {},
        this.methodInfoCreateUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/CreateUser',
    request,
    metadata || {},
    this.methodInfoCreateUser);
  }

  methodInfoDeleteUser = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/DeleteUser',
    grpcWeb.MethodType.UNARY,
    userservice_pb.DeleteUserRequest,
    google_protobuf_empty_pb.Empty,
    (request: userservice_pb.DeleteUserRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  deleteUser(
    request: userservice_pb.DeleteUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  deleteUser(
    request: userservice_pb.DeleteUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  deleteUser(
    request: userservice_pb.DeleteUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/DeleteUser',
        request,
        metadata || {},
        this.methodInfoDeleteUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/DeleteUser',
    request,
    metadata || {},
    this.methodInfoDeleteUser);
  }

  methodInfoSearchForUsers = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/SearchForUsers',
    grpcWeb.MethodType.UNARY,
    userservice_pb.SearchRequest,
    userservice_pb.SearchResponse,
    (request: userservice_pb.SearchRequest) => {
      return request.serializeBinary();
    },
    userservice_pb.SearchResponse.deserializeBinary
  );

  searchForUsers(
    request: userservice_pb.SearchRequest,
    metadata: grpcWeb.Metadata | null): Promise<userservice_pb.SearchResponse>;

  searchForUsers(
    request: userservice_pb.SearchRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: userservice_pb.SearchResponse) => void): grpcWeb.ClientReadableStream<userservice_pb.SearchResponse>;

  searchForUsers(
    request: userservice_pb.SearchRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: userservice_pb.SearchResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/SearchForUsers',
        request,
        metadata || {},
        this.methodInfoSearchForUsers,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/SearchForUsers',
    request,
    metadata || {},
    this.methodInfoSearchForUsers);
  }

  methodInfoChangePassword = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/ChangePassword',
    grpcWeb.MethodType.UNARY,
    userservice_pb.ChangePasswordRequest,
    google_protobuf_empty_pb.Empty,
    (request: userservice_pb.ChangePasswordRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  changePassword(
    request: userservice_pb.ChangePasswordRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  changePassword(
    request: userservice_pb.ChangePasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  changePassword(
    request: userservice_pb.ChangePasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/ChangePassword',
        request,
        metadata || {},
        this.methodInfoChangePassword,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/ChangePassword',
    request,
    metadata || {},
    this.methodInfoChangePassword);
  }

  methodInfoAddModel = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/AddModel',
    grpcWeb.MethodType.UNARY,
    modelservice_pb.NewModelRequest,
    modelservice_pb.NewModelResponse,
    (request: modelservice_pb.NewModelRequest) => {
      return request.serializeBinary();
    },
    modelservice_pb.NewModelResponse.deserializeBinary
  );

  addModel(
    request: modelservice_pb.NewModelRequest,
    metadata: grpcWeb.Metadata | null): Promise<modelservice_pb.NewModelResponse>;

  addModel(
    request: modelservice_pb.NewModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: modelservice_pb.NewModelResponse) => void): grpcWeb.ClientReadableStream<modelservice_pb.NewModelResponse>;

  addModel(
    request: modelservice_pb.NewModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: modelservice_pb.NewModelResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/AddModel',
        request,
        metadata || {},
        this.methodInfoAddModel,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/AddModel',
    request,
    metadata || {},
    this.methodInfoAddModel);
  }

  methodInfoEditTag = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/EditTag',
    grpcWeb.MethodType.UNARY,
    modelservice_pb.EditTagRequest,
    google_protobuf_empty_pb.Empty,
    (request: modelservice_pb.EditTagRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  editTag(
    request: modelservice_pb.EditTagRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  editTag(
    request: modelservice_pb.EditTagRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  editTag(
    request: modelservice_pb.EditTagRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/EditTag',
        request,
        metadata || {},
        this.methodInfoEditTag,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/EditTag',
    request,
    metadata || {},
    this.methodInfoEditTag);
  }

  methodInfoDeleteModel = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/DeleteModel',
    grpcWeb.MethodType.UNARY,
    modelservice_pb.DeleteModelRequest,
    google_protobuf_empty_pb.Empty,
    (request: modelservice_pb.DeleteModelRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  deleteModel(
    request: modelservice_pb.DeleteModelRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  deleteModel(
    request: modelservice_pb.DeleteModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  deleteModel(
    request: modelservice_pb.DeleteModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/DeleteModel',
        request,
        metadata || {},
        this.methodInfoDeleteModel,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/DeleteModel',
    request,
    metadata || {},
    this.methodInfoDeleteModel);
  }

  methodInfoGetUserModels = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/GetUserModels',
    grpcWeb.MethodType.UNARY,
    modelservice_pb.GetModelsRequest,
    modelservice_pb.GetModelsResponse,
    (request: modelservice_pb.GetModelsRequest) => {
      return request.serializeBinary();
    },
    modelservice_pb.GetModelsResponse.deserializeBinary
  );

  getUserModels(
    request: modelservice_pb.GetModelsRequest,
    metadata: grpcWeb.Metadata | null): Promise<modelservice_pb.GetModelsResponse>;

  getUserModels(
    request: modelservice_pb.GetModelsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: modelservice_pb.GetModelsResponse) => void): grpcWeb.ClientReadableStream<modelservice_pb.GetModelsResponse>;

  getUserModels(
    request: modelservice_pb.GetModelsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: modelservice_pb.GetModelsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/GetUserModels',
        request,
        metadata || {},
        this.methodInfoGetUserModels,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/GetUserModels',
    request,
    metadata || {},
    this.methodInfoGetUserModels);
  }

  methodInfoFitCurves = new grpcWeb.MethodDescriptor(
    '/protos.ApiService/FitCurves',
    grpcWeb.MethodType.UNARY,
    approximationservice_pb.CurveFitRequest,
    approximationservice_pb.CurveFitResult,
    (request: approximationservice_pb.CurveFitRequest) => {
      return request.serializeBinary();
    },
    approximationservice_pb.CurveFitResult.deserializeBinary
  );

  fitCurves(
    request: approximationservice_pb.CurveFitRequest,
    metadata: grpcWeb.Metadata | null): Promise<approximationservice_pb.CurveFitResult>;

  fitCurves(
    request: approximationservice_pb.CurveFitRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: approximationservice_pb.CurveFitResult) => void): grpcWeb.ClientReadableStream<approximationservice_pb.CurveFitResult>;

  fitCurves(
    request: approximationservice_pb.CurveFitRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: approximationservice_pb.CurveFitResult) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApiService/FitCurves',
        request,
        metadata || {},
        this.methodInfoFitCurves,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApiService/FitCurves',
    request,
    metadata || {},
    this.methodInfoFitCurves);
  }

}

