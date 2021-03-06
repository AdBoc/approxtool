# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import approximationservice_pb2 as approximationservice__pb2


class ApproximationServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.FitCurves = channel.unary_unary(
                '/protos.ApproximationService/FitCurves',
                request_serializer=approximationservice__pb2.InternalCurveFitRequest.SerializeToString,
                response_deserializer=approximationservice__pb2.CurveFitResult.FromString,
                )


class ApproximationServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def FitCurves(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_ApproximationServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'FitCurves': grpc.unary_unary_rpc_method_handler(
                    servicer.FitCurves,
                    request_deserializer=approximationservice__pb2.InternalCurveFitRequest.FromString,
                    response_serializer=approximationservice__pb2.CurveFitResult.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'protos.ApproximationService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class ApproximationService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def FitCurves(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/protos.ApproximationService/FitCurves',
            approximationservice__pb2.InternalCurveFitRequest.SerializeToString,
            approximationservice__pb2.CurveFitResult.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
