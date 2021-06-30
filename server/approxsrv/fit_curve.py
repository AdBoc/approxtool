import approximation_pb2
import numpy as np
from scipy.stats import pearsonr
from lmfit.models import ExpressionModel

special_characters = {'not', 'is', 'is not', 'in', 'not in', 'bs', 'acos', 'acosh', 'asin', 'asinh', 'atan',
                      'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'exp', 'fabs', 'factorial',
                      'floor', 'fmod', 'frexp', 'fsum', 'hypot', 'isinf', 'isnan', 'ldexp', 'log', 'log10', 'log1p',
                      'max', 'min', 'modf', 'pow', 'radians', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc', 'x'}


def get_fit_params(method):  # TODO: Works only when spaces are correct (use def parsing func)
    words = method.split()
    kwargs_set = set()
    for word in words:
        if not (word.isalpha()) or word in special_characters:
            continue
        else:
            kwargs_set.add(word)
    return dict.fromkeys(kwargs_set, 1)


def composeParams(result):
    params = []
    for param in result:
        params.append(approximation_pb2.Parameter(name=param.name, value=param.value, stderr=param.stderr))
    return params


def fit_curves(x_data, y_data, methods):
    fitting_results = []

    for method in methods:
        fit_result = fit_curve(x_data, y_data, method)
        fitting_results.append(fit_result)

    return fitting_results


def fit_curve(x_data, y_data, method):
    expression = ExpressionModel(method)
    fit_params = get_fit_params(method)
    try:
        print(method, fit_params)
        result = expression.fit(y_data, x=x_data, **fit_params)

        r = pearsonr(x_data, y_data)[0]
        params = composeParams(result.params.values())

        fit_res = approximation_pb2.FitResult(
            success_status=True,
            model_name="name",
            fitting_method=result.method,
            r=r,
            r_sqrt=r * r,
            aic=result.aic,
            bic=result.bic,
            fog=int(result.nfree),
            mean_of_x=np.mean(x_data),
            mean_of_y=np.mean(y_data),
            chi_sqrt=result.chisqr,
            data_points=result.ndata,
            parameter=params,
        )
    except ValueError:
        fit_res = approximation_pb2.FitResult(
            success_status=False,
            model_name="",
            fitting_method="",
            r=float(0),
            r_sqrt=float(0),
            aic=float(0),
            bic=float(0),
            fog=int(0),
            mean_of_x=float(0),
            mean_of_y=float(0),
            chi_sqrt=float(0),
            data_points=float(0),
            parameter=[],
        )

    return fit_res
