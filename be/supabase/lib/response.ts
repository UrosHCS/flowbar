function response(jsonBody: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(jsonBody), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

function errorResponse({
  message,
  code,
  status,
}: {
  message: string;
  code: string;
  status: number;
}) {
  return response({ error: { message, code } }, status);
}

/**
 * Internal server error
 */
export function internalServerErrorResponse(message: string, code?: string) {
  return errorResponse({
    message,
    code: code ?? 'internal_server_error',
    status: 500,
  });
}

/**
 * Resource was not found
 */
export function notFoundErrorResponse(message: string, code?: string) {
  return errorResponse({
    message,
    code: code ?? 'not_found',
    status: 404,
  });
}

/**
 * User is authenticated but does not have permission to access the resource
 */
export function forbiddenErrorResponse(message: string, code?: string) {
  return errorResponse({
    message,
    code: code ?? 'forbidden',
    status: 403,
  });
}

/**
 * Request lacks valid authentication credentials (not logged in)
 */
export function unauthorizedErrorResponse(message: string, code?: string) {
  return errorResponse({
    message,
    code: code ?? 'unauthorized',
    status: 401,
  });
}

export function badRequestErrorResponse(message: string, code?: string) {
  return errorResponse({
    message,
    code: code ?? 'bad_request',
    status: 400,
  });
}

export function validationErrorResponse(message: string, code?: string) {
  return errorResponse({
    message,
    code: code ?? 'validation_error',
    status: 422,
  });
}
