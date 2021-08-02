import asyncio

import numpy as np

import approximationservice_pb2
import approximationservice_pb2_grpc
import grpc
import os

from fit_curve import fit_curves


class Servicer(approximationservice_pb2_grpc.ApproximationServiceServicer):
    async def FitCurves(self, request, context):
        x_data = np.array(request.x_data)
        y_data = np.array(request.y_data)

        try:
            result = fit_curves(x_data, y_data, request.expressions)
            return approximationservice_pb2.CurveFitResult(fit_result=result)
        except Exception:
            context.set_details("uncaught error")
            context.set_code(13)
            return approximationservice_pb2.CurveFitResult()


async def serve() -> None:
    PORT = f"[::]{os.getenv('PORT')}"
    server = grpc.aio.server()
    approximationservice_pb2_grpc.add_ApproximationServiceServicer_to_server(Servicer(), server)
    server.add_insecure_port(PORT)
    await server.start()
    try:
        await server.wait_for_termination()
    except KeyboardInterrupt:
        await server.stop(0)


if __name__ == '__main__':
    asyncio.run(serve())
