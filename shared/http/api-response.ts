import { NextResponse } from 'next/server';

type IssuesType<T, U = string> = {
  formErrors: U[];
  fieldErrors: { [P in keyof T]?: U[] };
};

type ApiResponseBody<T> = {
  message?: string;
  data?: T;
  issues?: IssuesType<T>;
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

  static badRequest<T>(message = 'Bad Request', issues?: IssuesType<T>) {
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
