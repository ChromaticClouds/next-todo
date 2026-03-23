import { todoQueryKeys } from '@/features/tasks/query';
import { todoApi } from '@/features/tasks/services/todo-api';
import { Todo, TodoResponse } from '@/features/tasks/types';
import { ApiResponse } from '@/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useTodoMutation = () => {
  const queryClient = useQueryClient();

  return {
    createTodo: useMutation({
      mutationFn: todoApi.createTodo,
      onSuccess: async () =>
        await queryClient.invalidateQueries({ queryKey: todoQueryKeys.all }),
    }),

    toggleCompleted: useMutation({
      mutationFn: todoApi.toggleCompleted,

      onMutate: async (id: string) => {
        await queryClient.cancelQueries({ queryKey: todoQueryKeys.all });

        const previousTodos = queryClient.getQueryData<
          ApiResponse<TodoResponse[]>
        >(todoQueryKeys.all);

        queryClient.setQueryData<ApiResponse<TodoResponse[]>>(
          todoQueryKeys.all,
          (old) => {
            if (!old) return old;
            return {
              ...old,
              data: old.data?.map((todo) =>
                todo._id === id
                  ? { ...todo, completed: !todo.completed }
                  : todo,
              ),
            };
          },
        );

        return { previousTodos };
      },

      onError: (_error, _id, context) => {
        if (context?.previousTodos) {
          queryClient.setQueryData(['todos'], context.previousTodos);
        }
      },

      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
      },
    }),

    editTodo: useMutation<ApiResponse<void>, Error, { id: string; todo: Todo }>(
      {
        mutationFn: ({ id, todo }) => todoApi.editTodo(id, todo),
        onSuccess: async (_data, variables) => {
          await Promise.all([
            queryClient.refetchQueries({
              queryKey: todoQueryKeys.all,
            }),
            queryClient.invalidateQueries({
              queryKey: todoQueryKeys.detail(variables.id),
            }),
          ]);
        },
      },
    ),

    deleteTodo: useMutation({
      mutationFn: todoApi.deleteTodo,
      onSuccess: async () =>
        await queryClient.invalidateQueries({ queryKey: todoQueryKeys.all }),
    }),
  };
};
