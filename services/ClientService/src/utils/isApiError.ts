interface ApiError {
  code: number;
  message: string;
}

export function isApiError(error: any): error is ApiError {
  return typeof error.code === 'number' &&
    typeof error.message === 'string';
}