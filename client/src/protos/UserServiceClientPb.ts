/**
 * @fileoverview gRPC-Web generated client stub for userService
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as user_pb from './user_pb';


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

  methodInfoGetUser = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.UserResponse,
    (request: user_pb.UserId) => {
      return request.serializeBinary();
    },
    user_pb.UserResponse.deserializeBinary
  );

  getUser(
    request: user_pb.UserId,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.UserResponse>;

  getUser(
    request: user_pb.UserId,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.UserResponse) => void): grpcWeb.ClientReadableStream<user_pb.UserResponse>;

  getUser(
    request: user_pb.UserId,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.UserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/userService.UserService/GetUser',
        request,
        metadata || {},
        this.methodInfoGetUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/userService.UserService/GetUser',
    request,
    metadata || {},
    this.methodInfoGetUser);
  }

  methodInfoGetAllUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.UsersResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    user_pb.UsersResponse.deserializeBinary
  );

  getAllUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.UsersResponse>;

  getAllUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.UsersResponse) => void): grpcWeb.ClientReadableStream<user_pb.UsersResponse>;

  getAllUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.UsersResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/userService.UserService/GetAllUsers',
        request,
        metadata || {},
        this.methodInfoGetAllUsers,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/userService.UserService/GetAllUsers',
    request,
    metadata || {},
    this.methodInfoGetAllUsers);
  }

  methodInfoCreateUser = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: user_pb.NewUserRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  createUser(
    request: user_pb.NewUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  createUser(
    request: user_pb.NewUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  createUser(
    request: user_pb.NewUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/userService.UserService/CreateUser',
        request,
        metadata || {},
        this.methodInfoCreateUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/userService.UserService/CreateUser',
    request,
    metadata || {},
    this.methodInfoCreateUser);
  }

  methodInfoDeleteUser = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: user_pb.UserId) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  deleteUser(
    request: user_pb.UserId,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  deleteUser(
    request: user_pb.UserId,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  deleteUser(
    request: user_pb.UserId,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/userService.UserService/DeleteUser',
        request,
        metadata || {},
        this.methodInfoDeleteUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/userService.UserService/DeleteUser',
    request,
    metadata || {},
    this.methodInfoDeleteUser);
  }

  methodInfoChangeUserPrivilege = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: user_pb.UserPrivilegeRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  changeUserPrivilege(
    request: user_pb.UserPrivilegeRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  changeUserPrivilege(
    request: user_pb.UserPrivilegeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  changeUserPrivilege(
    request: user_pb.UserPrivilegeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/userService.UserService/ChangeUserPrivilege',
        request,
        metadata || {},
        this.methodInfoChangeUserPrivilege,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/userService.UserService/ChangeUserPrivilege',
    request,
    metadata || {},
    this.methodInfoChangeUserPrivilege);
  }

}

