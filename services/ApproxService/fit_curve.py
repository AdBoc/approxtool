import numpy
import approximationservice_pb2

from lmfit import Parameters
from lmfit.models import ExpressionModel


def fit_curves(x_data, y_data, expressions):
    fitting_results = []

    for expression in expressions:
        fit_result = fit_curve(x_data, y_data, expression)
        fitting_results.append(fit_result)

    return fitting_results


def fit_curve(x_data, y_data, expression):
    model = ExpressionModel(expression.expression)
    fit_params = get_fit_params(expression.parameters)
    try:
        result = model.fit(y_data, x=x_data, params=fit_params)
        params = composeParams(result.params.values())

        ME = numpy.mean(result.residual)  # Mean Error
        SE = numpy.square(result.residual)  # Squared errors
        MSE = numpy.mean(SE)  # Mean squared errors
        RMSE = numpy.sqrt(MSE)  # Root Mean Squared Error
        R_squared = 1.0 - (numpy.var(result.residual) / numpy.var(y_data))

        return approximationservice_pb2.FitResult(
            model_id=expression.id,
            success_status=True,
            model_name=expression.name,
            model_expression=expression.expression,
            lex_expression=expression.lex_expression,
            r_sqrt=R_squared,
            aic=result.aic,
            bic=result.bic,
            fog=int(result.nfree),
            mean_error=ME,
            mean_squared_error=MSE,
            root_mean_squared_error=RMSE,
            parameters=params,
        )
    except ValueError:
        print('exception!!', expression.expression)
        return approximationservice_pb2.FitResult(
            model_id=expression.id,
            success_status=False,
            model_name=expression.name,
            model_expression=expression.expression,
            lex_expression=expression.lex_expression,
            r_sqrt=float(0),
            aic=float(0),
            bic=float(0),
            fog=int(0),
            mean_error=float(0),
            mean_squared_error=float(0),
            root_mean_squared_error=float(0),
            parameters=[],
        )


def get_fit_params(parameters):
    parsed_params = Parameters()
    for param in parameters:
        parsed_params.add(param.paramName, value=param.paramValue, min=param.minBound, max=param.maxBound)
    return parsed_params


def composeParams(result):
    params = []
    for param in result:
        params.append(approximationservice_pb2.Parameter(name=param.name, value=param.value, stderr=param.stderr))
    return params
