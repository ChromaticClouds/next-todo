import { NextResponse } from 'next/server';

type ApiResponseBody<T> = {
  message?: string;
  data?: T;
  issues?: readonly string[];
};

export class ApiResponse {
  private static build<T>(
    body: ApiResponseBody<T>,
    status: number,
  ): NextResponse<ApiResponseBody<T>> {
    return NextResponse.json(body, { status });
  }

  static ok<T>(data?: T, message = 'OK') {
    return this.build<T>({ message, data }, 200);
  }

  static created<T>(data?: T, message = 'Created') {
    return this.build<T>({ message, data }, 201);
  }

  static badRequest(message = 'Bad Request', issues: readonly string[] = []) {
    return this.build({ message, issues }, 400);
  }

  static unauthorized(message = 'Unauthorized') {
    return this.build({ message }, 401);
  }

  static forbidden(message = 'Forbidden') {
    return this.build({ message }, 403);
  }

  static notFound(message = 'Not Found') {
    return this.build({ message }, 404);
  }

  static conflict(message = 'Conflict') {
    return this.build({ message }, 409);
  }

  static internalServerError(message = 'Internal Server Error') {
    return this.build({ message }, 500);
  }
}
