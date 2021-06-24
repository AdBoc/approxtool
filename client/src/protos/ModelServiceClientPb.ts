/**
 * @fileoverview gRPC-Web generated client stub for modelService
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as model_pb from './model_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


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

  methodInfoGetUserModels = new grpcWeb.AbstractClientBase.MethodInfo(
    model_pb.Models,
    (request: model_pb.UserId) => {
      return request.serializeBinary();
    },
    model_pb.Models.deserializeBinary
  );

  getUserModels(
    request: model_pb.UserId,
    metadata: grpcWeb.Metadata | null): Promise<model_pb.Models>;

  getUserModels(
    request: model_pb.UserId,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: model_pb.Models) => void): grpcWeb.ClientReadableStream<model_pb.Models>;

  getUserModels(
    request: model_pb.UserId,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: model_pb.Models) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/modelService.ModelService/GetUserModels',
        request,
        metadata || {},
        this.methodInfoGetUserModels,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/modelService.ModelService/GetUserModels',
    request,
    metadata || {},
    this.methodInfoGetUserModels);
  }

  methodInfoAddModel = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: model_pb.NewModelRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  addModel(
    request: model_pb.NewModelRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  addModel(
    request: model_pb.NewModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  addModel(
    request: model_pb.NewModelRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/modelService.ModelService/AddModel',
        request,
        metadata || {},
        this.methodInfoAddModel,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/modelService.ModelService/AddModel',
    request,
    metadata || {},
    this.methodInfoAddModel);
  }

  methodInfoDeleteModel = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: model_pb.ModelId) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  deleteModel(
    request: model_pb.ModelId,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  deleteModel(
    request: model_pb.ModelId,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  deleteModel(
    request: model_pb.ModelId,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/modelService.ModelService/DeleteModel',
        request,
        metadata || {},
        this.methodInfoDeleteModel,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/modelService.ModelService/DeleteModel',
    request,
    metadata || {},
    this.methodInfoDeleteModel);
  }

}

