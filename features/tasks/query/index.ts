import { todoApi } from '@/features/tasks/services/todo-api';
import { TodoResponse } from '@/features/tasks/types';
import { ApiResponse } from '@/shared/types';
import { QueryFunction } from '@tanstack/react-query';

export const todoQueryKeys = {
  all: ['todos'] as const,
  lists: () => [...todoQueryKeys.all, 'list'] as const,
  list: (params?: { q?:string; completed?: boolean }) =>
    [...todoQueryKeys.lists(), params ?? {}] as const,

  details: () => [...todoQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...todoQueryKeys.details(), id] as const,
};

export const todoQueries = {
  all: () => ({
    queryKey: todoQueryKeys.all,
    queryFn: todoApi.getTodos as QueryFunction<ApiResponse<TodoResponse[]>>,
    select: (response: ApiResponse<TodoResponse[]>) => response.data,
  }),

  detail: (id: string) => ({
    queryKey: todoQueryKeys.detail(id),
    queryFn: () => todoApi.getDetailTodo(id),
    enabled: !!id,
  })
};
