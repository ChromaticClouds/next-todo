import { useAppForm } from '@/components/form';
import { useTodoMutation } from '@/features/tasks/hooks/use-todo-mutation';
import { taskSchema } from '@/features/tasks/schemas/task-schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const createDefaultValues = () => {
  const now = new Date();

  return {
    title: '',
    description: '',
    timeRange: {
      from: now,
      to: new Date(now.getTime() + 60 * 60 * 1000),
    },
    color: '',
  };
};

const toPayload = (value: ReturnType<typeof createDefaultValues>) => ({
  ...value,
  timeRange: {
    from: value.timeRange.from.toISOString(),
    to: value.timeRange.to.toISOString(),
  },
});

export const useTaskForm = () => {
  const router = useRouter();
  const { createTodo: mutation } = useTodoMutation();

  return useAppForm({
    defaultValues: createDefaultValues(),
    validators: {
      onChange: taskSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      await mutation.mutateAsync(toPayload(value));
      formApi.reset(createDefaultValues());
      toast.success('Task created successfully');
      router.push('/');
    },
  });
};
