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

  methodInfoFitCurves = new grpcWeb.AbstractClientBase.MethodInfo(
    approximation_pb.CurveFitResult,
    (request: approximation_pb.CurveFitRequest) => {
      return request.serializeBinary();
    },
    approximation_pb.CurveFitResult.deserializeBinary
  );

  fitCurves(
    request: approximation_pb.CurveFitRequest,
    metadata: grpcWeb.Metadata | null): Promise<approximation_pb.CurveFitResult>;

  fitCurves(
    request: approximation_pb.CurveFitRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: approximation_pb.CurveFitResult) => void): grpcWeb.ClientReadableStream<approximation_pb.CurveFitResult>;

  fitCurves(
    request: approximation_pb.CurveFitRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: approximation_pb.CurveFitResult) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/approximationService.ApproximationService/FitCurves',
        request,
        metadata || {},
        this.methodInfoFitCurves,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/approximationService.ApproximationService/FitCurves',
    request,
    metadata || {},
    this.methodInfoFitCurves);
  }

}

