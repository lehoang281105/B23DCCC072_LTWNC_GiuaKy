export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function isApiSuccess<T>(
  response: ApiResponse<T>
): response is { ok: true; data: T } {
  return response.ok === true;
}

export function isApiError<T>(
  response: ApiResponse<T>
): response is { ok: false; error: string } {
  return response.ok === false;
}
