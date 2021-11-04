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
import * as modelservice_pb from './modelservice_pb';


export class ModelServiceClient {
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

  methodInfoAddModel = new grpcWeb.MethodDescriptor(
    '/protos.ModelService/AddModel',
    grpcWeb.MethodType.UNARY,
    modelservice_pb.InternalNewModelRequest,
    modelservice_pb.NewModelResponse,
    (request: modelservice_pb.InternalNewModelRequest) => {
      return request.serializeBinary();
    },
    modelservice_pb.NewModelResponse.deserializeBinary
  );

  addModel(
    request: modelservice_pb.InternalNewModelRequest,
    metadata: grpcWeb.Metadata | null): Promise<modelservice_pb.NewModelResponse>;

  addModel(
    request: modelservice_pb.InternalNewModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: modelservice_pb.NewModelResponse) => void): grpcWeb.ClientReadableStream<modelservice_pb.NewModelResponse>;

  addModel(
    request: modelservice_pb.InternalNewModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: modelservice_pb.NewModelResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ModelService/AddModel',
        request,
        metadata || {},
        this.methodInfoAddModel,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ModelService/AddModel',
    request,
    metadata || {},
    this.methodInfoAddModel);
  }

  methodInfoEditTag = new grpcWeb.MethodDescriptor(
    '/protos.ModelService/EditTag',
    grpcWeb.MethodType.UNARY,
    modelservice_pb.InternalEditTagRequest,
    google_protobuf_empty_pb.Empty,
    (request: modelservice_pb.InternalEditTagRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  editTag(
    request: modelservice_pb.InternalEditTagRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  editTag(
    request: modelservice_pb.InternalEditTagRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  editTag(
    request: modelservice_pb.InternalEditTagRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ModelService/EditTag',
        request,
        metadata || {},
        this.methodInfoEditTag,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ModelService/EditTag',
    request,
    metadata || {},
    this.methodInfoEditTag);
  }

  methodInfoDeleteModel = new grpcWeb.MethodDescriptor(
    '/protos.ModelService/DeleteModel',
    grpcWeb.MethodType.UNARY,
    modelservice_pb.InternalDeleteModelRequest,
    google_protobuf_empty_pb.Empty,
    (request: modelservice_pb.InternalDeleteModelRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  deleteModel(
    request: modelservice_pb.InternalDeleteModelRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  deleteModel(
    request: modelservice_pb.InternalDeleteModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  deleteModel(
    request: modelservice_pb.InternalDeleteModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ModelService/DeleteModel',
        request,
        metadata || {},
        this.methodInfoDeleteModel,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ModelService/DeleteModel',
    request,
    metadata || {},
    this.methodInfoDeleteModel);
  }

  methodInfoGetUserModels = new grpcWeb.MethodDescriptor(
    '/protos.ModelService/GetUserModels',
    grpcWeb.MethodType.UNARY,
    modelservice_pb.InternalGetModelsRequest,
    modelservice_pb.GetModelsResponse,
    (request: modelservice_pb.InternalGetModelsRequest) => {
      return request.serializeBinary();
    },
    modelservice_pb.GetModelsResponse.deserializeBinary
  );

  getUserModels(
    request: modelservice_pb.InternalGetModelsRequest,
    metadata: grpcWeb.Metadata | null): Promise<modelservice_pb.GetModelsResponse>;

  getUserModels(
    request: modelservice_pb.InternalGetModelsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: modelservice_pb.GetModelsResponse) => void): grpcWeb.ClientReadableStream<modelservice_pb.GetModelsResponse>;

  getUserModels(
    request: modelservice_pb.InternalGetModelsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: modelservice_pb.GetModelsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ModelService/GetUserModels',
        request,
        metadata || {},
        this.methodInfoGetUserModels,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ModelService/GetUserModels',
    request,
    metadata || {},
    this.methodInfoGetUserModels);
  }

  methodInfoAddDefaultModels = new grpcWeb.MethodDescriptor(
    '/protos.ModelService/AddDefaultModels',
    grpcWeb.MethodType.UNARY,
    modelservice_pb.AddDefaultModelRequest,
    google_protobuf_empty_pb.Empty,
    (request: modelservice_pb.AddDefaultModelRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  addDefaultModels(
    request: modelservice_pb.AddDefaultModelRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  addDefaultModels(
    request: modelservice_pb.AddDefaultModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  addDefaultModels(
    request: modelservice_pb.AddDefaultModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ModelService/AddDefaultModels',
        request,
        metadata || {},
        this.methodInfoAddDefaultModels,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ModelService/AddDefaultModels',
    request,
    metadata || {},
    this.methodInfoAddDefaultModels);
  }

}

