import asyncio

import numpy as np

import approximation_pb2
import approximation_pb2_grpc
import grpc
import logging
from fit_curve import fit_curves

test_params_res = approximation_pb2.Parameter(
    name="name",
    value=1,
    stderr=2,
)
test_wrap_param = [test_params_res]

test_fit_res = approximation_pb2.FitResult(
    success_status=False,
    r=float(0),
    r_sqrt=float(0),
    aic=float(0),
    bic=float(0),
    fog=int(0),
    mean_of_x=float(0),
    mean_of_y=float(0),
    chi_sqrt=float(0),
    reduced_chi_sqrt=float(0),
    data_points=float(0),
    fitting_method="least_sq",
    parameter=test_wrap_param,
    model_name="name"
)
test_wrap_res = [test_fit_res]


class Servicer(approximation_pb2_grpc.ApproximationServiceServicer):
    async def FitCurves(self, request, context):
        x_data = request.x_data
        y_data = request.y_data
        expressions = request.expressions

        x_data = np.array(x_data)
        y_data = np.array(y_data)

        fit_res = fit_curves(x_data, y_data, expressions)
        return approximation_pb2.CurveFitResult(fit_result=fit_res)

        # return approximation_pb2.CurveFitResult(fit_result=test_wrap_res) #CAUTION - FOR TESTING


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
