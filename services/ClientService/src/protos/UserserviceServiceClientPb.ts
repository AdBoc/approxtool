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


export class UserServiceClient {
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

  methodInfoChangeUserPrivilege = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: userservice_pb.InternalChangePrivilegeRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  changeUserPrivilege(
    request: userservice_pb.InternalChangePrivilegeRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  changeUserPrivilege(
    request: userservice_pb.InternalChangePrivilegeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  changeUserPrivilege(
    request: userservice_pb.InternalChangePrivilegeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.UserService/ChangeUserPrivilege',
        request,
        metadata || {},
        this.methodInfoChangeUserPrivilege,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.UserService/ChangeUserPrivilege',
    request,
    metadata || {},
    this.methodInfoChangeUserPrivilege);
  }

  methodInfoVerifyPassword = new grpcWeb.AbstractClientBase.MethodInfo(
    userservice_pb.VerifyPasswordResponse,
    (request: userservice_pb.VerifyPasswordRequest) => {
      return request.serializeBinary();
    },
    userservice_pb.VerifyPasswordResponse.deserializeBinary
  );

  verifyPassword(
    request: userservice_pb.VerifyPasswordRequest,
    metadata: grpcWeb.Metadata | null): Promise<userservice_pb.VerifyPasswordResponse>;

  verifyPassword(
    request: userservice_pb.VerifyPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: userservice_pb.VerifyPasswordResponse) => void): grpcWeb.ClientReadableStream<userservice_pb.VerifyPasswordResponse>;

  verifyPassword(
    request: userservice_pb.VerifyPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: userservice_pb.VerifyPasswordResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.UserService/VerifyPassword',
        request,
        metadata || {},
        this.methodInfoVerifyPassword,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.UserService/VerifyPassword',
    request,
    metadata || {},
    this.methodInfoVerifyPassword);
  }

  methodInfoCreateUser = new grpcWeb.AbstractClientBase.MethodInfo(
    userservice_pb.UserResponse,
    (request: userservice_pb.InternalNewUserRequest) => {
      return request.serializeBinary();
    },
    userservice_pb.UserResponse.deserializeBinary
  );

  createUser(
    request: userservice_pb.InternalNewUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<userservice_pb.UserResponse>;

  createUser(
    request: userservice_pb.InternalNewUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: userservice_pb.UserResponse) => void): grpcWeb.ClientReadableStream<userservice_pb.UserResponse>;

  createUser(
    request: userservice_pb.InternalNewUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: userservice_pb.UserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.UserService/CreateUser',
        request,
        metadata || {},
        this.methodInfoCreateUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.UserService/CreateUser',
    request,
    metadata || {},
    this.methodInfoCreateUser);
  }

  methodInfoDeleteUser = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: userservice_pb.InternalDeleteUserRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  deleteUser(
    request: userservice_pb.InternalDeleteUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  deleteUser(
    request: userservice_pb.InternalDeleteUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  deleteUser(
    request: userservice_pb.InternalDeleteUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.UserService/DeleteUser',
        request,
        metadata || {},
        this.methodInfoDeleteUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.UserService/DeleteUser',
    request,
    metadata || {},
    this.methodInfoDeleteUser);
  }

  methodInfoGetAllUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    userservice_pb.GetUsersResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    userservice_pb.GetUsersResponse.deserializeBinary
  );

  getAllUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<userservice_pb.GetUsersResponse>;

  getAllUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: userservice_pb.GetUsersResponse) => void): grpcWeb.ClientReadableStream<userservice_pb.GetUsersResponse>;

  getAllUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: userservice_pb.GetUsersResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.UserService/GetAllUsers',
        request,
        metadata || {},
        this.methodInfoGetAllUsers,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.UserService/GetAllUsers',
    request,
    metadata || {},
    this.methodInfoGetAllUsers);
  }

  methodInfoSearchForUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    userservice_pb.SearchResponse,
    (request: userservice_pb.InternalSearchRequest) => {
      return request.serializeBinary();
    },
    userservice_pb.SearchResponse.deserializeBinary
  );

  searchForUsers(
    request: userservice_pb.InternalSearchRequest,
    metadata: grpcWeb.Metadata | null): Promise<userservice_pb.SearchResponse>;

  searchForUsers(
    request: userservice_pb.InternalSearchRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: userservice_pb.SearchResponse) => void): grpcWeb.ClientReadableStream<userservice_pb.SearchResponse>;

  searchForUsers(
    request: userservice_pb.InternalSearchRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: userservice_pb.SearchResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.UserService/SearchForUsers',
        request,
        metadata || {},
        this.methodInfoSearchForUsers,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.UserService/SearchForUsers',
    request,
    metadata || {},
    this.methodInfoSearchForUsers);
  }

  methodInfoChangePassword = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: userservice_pb.InternalChangePasswordRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  changePassword(
    request: userservice_pb.InternalChangePasswordRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  changePassword(
    request: userservice_pb.InternalChangePasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  changePassword(
    request: userservice_pb.InternalChangePasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.UserService/ChangePassword',
        request,
        metadata || {},
        this.methodInfoChangePassword,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.UserService/ChangePassword',
    request,
    metadata || {},
    this.methodInfoChangePassword);
  }

}

