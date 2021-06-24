/**
 * @fileoverview gRPC-Web generated client stub for approximationService
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as approximation_pb from './approximation_pb';


export class ApproximationServiceClient {
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

  methodInfoGetApproximation = new grpcWeb.AbstractClientBase.MethodInfo(
    approximation_pb.CalculationResult,
    (request: approximation_pb.CalculationRequest) => {
      return request.serializeBinary();
    },
    approximation_pb.CalculationResult.deserializeBinary
  );

  getApproximation(
    request: approximation_pb.CalculationRequest,
    metadata: grpcWeb.Metadata | null): Promise<approximation_pb.CalculationResult>;

  getApproximation(
    request: approximation_pb.CalculationRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: approximation_pb.CalculationResult) => void): grpcWeb.ClientReadableStream<approximation_pb.CalculationResult>;

  getApproximation(
    request: approximation_pb.CalculationRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: approximation_pb.CalculationResult) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/approximationService.ApproximationService/GetApproximation',
        request,
        metadata || {},
        this.methodInfoGetApproximation,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/approximationService.ApproximationService/GetApproximation',
    request,
    metadata || {},
    this.methodInfoGetApproximation);
  }

}

