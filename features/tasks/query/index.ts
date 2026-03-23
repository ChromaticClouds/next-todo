import { todoApi } from '@/features/tasks/services/todo-api';
import { TodoResponse } from '@/features/tasks/types';
import { ApiResponse } from '@/shared/types';
import { QueryFunction } from '@tanstack/react-query';

export const todoQueryKeys = {
  all: ['todos'] as const,
  lists: () => [...todoQueryKeys.all, 'list'] as const,
  list: (params?: { search?: string; completed?: boolean }) =>
    [
      ...todoQueryKeys.lists(),
      { search: params?.search ?? '', ...params },
    ] as const,

  details: () => [...todoQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...todoQueryKeys.details(), id] as const,
};

export const todoQueries = {
  list: (params: { search?: string; completed?: boolean }) => ({
    queryKey: todoQueryKeys.list(params),
    queryFn: () => todoApi.getTodos(params.search ?? ''),
    select: (response: ApiResponse<TodoResponse[]>) => response.data,
  }),

  detail: (id: string) => ({
    queryKey: todoQueryKeys.detail(id),
    queryFn: (() => todoApi.getDetailTodo(id)) as QueryFunction<
      ApiResponse<TodoResponse>
    >,
    enabled: !!id,
    select: (response: ApiResponse<TodoResponse>) => response.data,
  }),
};
