import mongoose from 'mongoose';
import { withMongo } from '@/lib/mongoose';
import { ApiResponse } from '@/shared/http/api-response';
import { NextRequest } from 'next/server';
import { todoService } from '@/features/tasks/server/todo-service';
import { runApiEffect } from '@/lib/effect';

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return ApiResponse.badRequest('Invalid todo id');

  return withMongo(() =>
    runApiEffect({
      effect: todoService.getDetailTodo(id),
      onSuccess: (value) => ApiResponse.ok(value),
      onError: {
        TodoNotFoundError: () => ApiResponse.notFound('Todo not found'),
        GetDetailTodoError: () =>
          ApiResponse.internalServerError('Failed to fetch todo detail'),
      },
    }),
  );
};

export const PATCH = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return ApiResponse.badRequest('Invalid todo id');

  return withMongo(() =>
    runApiEffect({
      effect: todoService.toggleCompleted(id),
      onSuccess: (value) => ApiResponse.ok(value),
      onError: {
        TodoNotFoundError: () => ApiResponse.notFound('Todo not found'),
        ToggleCompletedError: () =>
          ApiResponse.internalServerError(
            'Toggle completed error. Try again later',
          ),
      },
    }),
  );
};
