import { ApiResponse } from '@/shared/http/api-response';
import { todoService } from '@/features/tasks/server/todo-service';
import { NextRequest } from 'next/server';
import { withMongo } from '@/lib/mongoose';
import { runApiEffect } from '@/lib/effect';

export const runtime = 'nodejs';

export const GET = async (request: NextRequest) => {
  const search = request.nextUrl.searchParams.get('search')?.trim() ?? '';

  return withMongo(() =>
    runApiEffect({
      effect: todoService.getTodos(search),
      onSuccess: (value) => ApiResponse.ok(value),
      onError: {
        GetTodosError: () =>
          ApiResponse.internalServerError('Failed to fetch todos'),
      },
    }),
  );
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  return withMongo(() =>
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
