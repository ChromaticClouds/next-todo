import { ApiResponse } from '@/shared/http/api-response';
import { todoService } from '@/features/tasks/server/todo-service';
import { NextRequest } from 'next/server';
import { withMongo } from '@/lib/mongoose';
import { runApiEffect } from '@/lib/effect';
import { requireAuth } from '@/features/auth/server/auth-guard';

export const runtime = 'nodejs';

export const GET = async (request: NextRequest) => {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  const search = request.nextUrl.searchParams.get('search')?.trim() ?? '';

  return withMongo(() =>
    runApiEffect({
      effect: todoService.getTodos(auth.userId, search),
      onSuccess: (value) => ApiResponse.ok(value),
      onError: {
        GetTodosError: () =>
          ApiResponse.internalServerError('Failed to fetch todos'),
      },
    }),
  );
};

export const POST = async (request: NextRequest) => {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  const body = await request.json();

  return withMongo(() =>
    runApiEffect({
      effect: todoService.createTodo(auth.userId, body),
      onSuccess: (value) =>
        ApiResponse.created(value, 'Todo created successfully'),
      onError: {
        ValidationError: () => ApiResponse.badRequest('Invalid todo payload'),
        CreateTodoError: () =>
          ApiResponse.internalServerError('Failed to create todo'),
      },
    }),
  );
};
