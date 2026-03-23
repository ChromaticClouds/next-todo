import { Todo, TodoResponse } from '@/features/tasks/types';
import { api } from '@/services/api';

type ApiResponse<T = unknown> = {
  message?: string;
  data?: T extends void ? never : T;
};

export const todoApi = {
  getTodos: (search: string) =>
    api
      .get('todos', { searchParams: { search } })
      .json<ApiResponse<TodoResponse[]>>(),
  getDetailTodo: (id: string) =>
    api.get(`todos/${id}`).json<ApiResponse<TodoResponse>>(),
  createTodo: (input: Todo) =>
    api.post('todos', { json: input }).json<ApiResponse<TodoResponse>>(),
  toggleCompleted: (id: string) =>
    api.patch(`todos/${id}`).json<ApiResponse<void>>(),
  editTodo: (id: string, todo: Todo) =>
    api.put(`todos/${id}`, { json: todo }).json<ApiResponse<void>>(),
  deleteTodo: (id: string) =>
    api.delete(`todos/${id}`).json<ApiResponse<void>>(),
};
