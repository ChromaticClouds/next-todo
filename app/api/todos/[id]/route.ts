import mongoose from 'mongoose';
import { withMongo } from '@/lib/mongoose';
import { ApiResponse } from '@/shared/http/api-response';
import { NextRequest } from 'next/server';
import { todoService } from '@/features/tasks/server/todo-service';
import { runApiEffect } from '@/lib/effect';
import { requireAuth } from '@/features/auth/server/auth-guard';

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return ApiResponse.badRequest('Invalid todo id');

  return withMongo(() =>
    runApiEffect({
      effect: todoService.getDetailTodo(auth.userId, id),
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
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return ApiResponse.badRequest('Invalid todo id');

  return withMongo(() =>
    runApiEffect({
      effect: todoService.toggleCompleted(auth.userId, id),
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

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  const body = await request.json();
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return ApiResponse.badRequest('Invalid todo id');

  if (!body) return ApiResponse.badRequest('Invalid edit format');

  return withMongo(() =>
    runApiEffect({
      effect: todoService.editTodo(auth.userId, id, body),
      onSuccess: () => ApiResponse.ok(null, 'Successfully changed task'),
      onError: {
        ValidationError: () => ApiResponse.badRequest('Invalid todo payload'),
        TodoNotFoundError: () => ApiResponse.notFound('Todo not found'),
        UpdateTodoError: (cause) =>
          ApiResponse.internalServerError(String(cause)),
      },
    }),
  );
};

export const DELETE = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return ApiResponse.badRequest('Invalid todo id');

  return withMongo(() =>
    runApiEffect({
      effect: todoService.deleteTodo(auth.userId, id),
      onSuccess: () => ApiResponse.ok(null, 'Deleted todo successfully'),
      onError: {
        TodoNotFoundError: () => ApiResponse.notFound('Todo not found'),
        DeleteTodoError: ({ id: failedId }) =>
          ApiResponse.internalServerError(`Cannot delete todo: ${failedId}`),
      },
    }),
  );
};
