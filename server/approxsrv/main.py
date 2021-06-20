from concurrent import futures
import approximation_pb2
import approximation_pb2_grpc
import grpc


class Servicer(approximation_pb2_grpc.ApproximationServiceServicer):
    def GetApproximation(self, request, context):
        print(f"Received request: {request.model} {request.type}")

        calculation_result = approximation_pb2.CalculationResult()
        calculation_result.result = "result"
        return calculation_result


if __name__ == '__main__':
    server = grpc.server(futures.ThreadPoolExecutor(3))
    approximation_pb2_grpc.add_ApproximationServiceServicer_to_server(Servicer(), server)
    server.add_insecure_port("[::]:9002")
    server.start()
    server.wait_for_termination()
