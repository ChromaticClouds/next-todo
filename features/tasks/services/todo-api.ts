import { Todo, TodoResponse } from '@/features/tasks/types';
import { api } from '@/services/api';

type ApiResponse<T = unknown> = {
  message?: string;
  data?: T extends void ? never : T;
};

export const todoApi = {
  getTodos: () => api.get('todos').json<ApiResponse<TodoResponse[]>>(),
  getDetailTodo: (id: string) =>
    api.get(`todos/${id}`).json<ApiResponse<TodoResponse>>(),
  createTodo: (input: Todo) =>
    api.post('todos', { json: input }).json<ApiResponse<TodoResponse>>(),
  toggleCompleted: (id: string) =>
    api.patch(`todos/${id}`).json<ApiResponse<void>>(),
};
