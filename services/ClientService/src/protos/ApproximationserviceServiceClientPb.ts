/**
 * @fileoverview gRPC-Web generated client stub for protos
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as approximationservice_pb from './approximationservice_pb';


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
    callback: (err: grpcWeb.Error,
               response: approximationservice_pb.CurveFitResult) => void): grpcWeb.ClientReadableStream<approximationservice_pb.CurveFitResult>;

  fitCurves(
    request: approximationservice_pb.CurveFitRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: approximationservice_pb.CurveFitResult) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protos.ApproximationService/FitCurves',
        request,
        metadata || {},
        this.methodInfoFitCurves,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protos.ApproximationService/FitCurves',
    request,
    metadata || {},
    this.methodInfoFitCurves);
  }

}

