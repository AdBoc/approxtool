import asyncio
import approximation_pb2
import approximation_pb2_grpc
import grpc
import logging


class Servicer(approximation_pb2_grpc.ApproximationServiceServicer):
    async def GetApproximation(self, request, context):
        print(f"Received request: {request.model} {request.type}")

        calculation_result = approximation_pb2.CalculationResult()
        calculation_result.result = "result"
        return calculation_result


async def serve() -> None:
    listen_addr = '[::]:9002'
    server = grpc.aio.server()
    approximation_pb2_grpc.add_ApproximationServiceServicer_to_server(Servicer(), server)
    server.add_insecure_port(listen_addr)
    logging.info("Starting server on %s", listen_addr)
    await server.start()
    try:
        await server.wait_for_termination()
    except KeyboardInterrupt:
        await server.stop(0)


if __name__ == '__main__':
    asyncio.run(serve())
