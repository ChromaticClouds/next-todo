import { useAppForm } from '@/components/form';
import { useTodoMutation } from '@/features/tasks/hooks/use-todo-mutation';
import { taskSchema } from '@/features/tasks/schemas/task-schema';
import { TodoResponse } from '@/features/tasks/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const createDefaultValues = (todo: TodoResponse | undefined) => {
  const now = new Date();

  return {
    title: todo?.title ?? '',
    description: todo?.description ?? '',
    timeRange: {
      from: todo?.startAt ? new Date(todo.startAt) : now,
      to: todo?.endAt
        ? new Date(todo.endAt)
        : new Date(now.getTime() + 60 * 60 * 1000),
    },
    color: todo?.color ?? 'var(--primary)',
  };
};

const toPayload = (value: ReturnType<typeof createDefaultValues>) => ({
  ...value,
  timeRange: {
    from: value.timeRange.from.toISOString(),
    to: value.timeRange.to.toISOString(),
  },
});

export const useEditForm = (id: string, todo: TodoResponse | undefined) => {
  const router = useRouter();
  const { editTodo: mutation } = useTodoMutation();

  return useAppForm({
    defaultValues: createDefaultValues(todo),
    validators: { onChange: taskSchema },
    onSubmit: async ({ value }) => {
      const response = await mutation.mutateAsync({
        id,
        todo: toPayload(value),
      });
      
      toast.success(response.message);
      router.push('/');
    },
  });
};
