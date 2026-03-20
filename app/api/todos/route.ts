import { ApiResponse } from '@/shared/http/api-response';
import { todoService } from '@/features/tasks/server/todo-service';
import { NextRequest } from 'next/server';
import { withMongo } from '@/lib/mongoose';
import { safeJsonParse } from '@/shared/safe-json-parse';
import { runApiEffect } from '@/lib/effect';

export const runtime = 'nodejs';

export const GET = async () =>
  withMongo(() =>
    runApiEffect({
      effect: todoService.getTodos(),
      onSuccess: (value) => ApiResponse.ok(value),
      onError: {
        GetTodosError: () =>
          ApiResponse.internalServerError('Failed to fetch todos'),
      },
    }),
  );

export const POST = async (request: NextRequest) => {
  const body = await safeJsonParse(request);

  withMongo(() =>
    runApiEffect({
      effect: todoService.createTodo(body),
      onSuccess: (value) => ApiResponse.ok(value, 'Todo fetched successfully'),
      onError: {
        CreateTodoError: () =>
          ApiResponse.internalServerError('Failed to fetch todos'),
      },
    }),
  );
};
