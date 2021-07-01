import approximation_pb2
import numpy as np
from scipy.stats import pearsonr
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

        r = pearsonr(x_data, y_data)[0]
        params = composeParams(result.params.values())

        return approximation_pb2.FitResult(
            model_id=expression.id,
            success_status=True,
            model_name=expression.name,
            model_expression=expression.expression,
            r=r,
            r_sqrt=r * r,
            aic=result.aic,
            bic=result.bic,
            fog=int(result.nfree),
            mean_of_x=np.mean(x_data),
            mean_of_y=np.mean(y_data),
            chi_sqrt=result.chisqr,
            reduced_chi_sqrt=result.redchi,
            data_points=result.ndata,
            fitting_method=result.method,
            parameters=params,
        )
    except ValueError:
        print('exception!!', expression.expression)
        return approximation_pb2.FitResult(
            model_id=expression.id,
            success_status=False,
            model_name=expression.name,
            model_expression=expression.expression,
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
            fitting_method="",
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
        params.append(approximation_pb2.Parameter(name=param.name, value=param.value, stderr=param.stderr))
    return params
