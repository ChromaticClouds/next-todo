"use client"

import { FieldSeparator } from '@/components/ui/field';
import { TodoNotFound } from '@/features/tasks/components/detail/todo-not-found';
import { EditTaskSkeleton } from '@/features/tasks/components/edit-task/edit-task-skeleton';
import { useEditForm } from '@/features/tasks/hooks/use-edit-form';
import { todoQueries } from '@/features/tasks/query';
import { taskSchema } from '@/features/tasks/schemas/task-schema';
import { useQuery } from '@tanstack/react-query';
import { CircleCheckIcon } from 'lucide-react';

export const EditTaskForm = ({ id }: { id: string }) => {
  const { data: todo, isPending, isError } = useQuery(todoQueries.detail(id));

  const form = useEditForm(id, todo);

  if (isPending) return <EditTaskSkeleton />;

  if (isError || !todo) return <TodoNotFound />;

  return (
    <form.AppForm>
      <form.CustomForm className="space-y-2 w-full gap-4">
        <form.AppField name="title">
          {(field) => (
            <field.TextField
              label="Title"
              showErrorText={false}
              description={`${field.state.value?.length}/${taskSchema.shape.title.maxLength}`}
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextField
              label="Description"
              showErrorText={false}
              description={`${field.state.value?.length}/${taskSchema.shape.description.maxLength}`}
            />
          )}
        </form.AppField>
        <FieldSeparator />
        <form.AppField name="timeRange.from">
          {(field) => (
            <field.TimePickerField
              label="From"
              className="grid grid-cols-[1fr_160px]"
            />
          )}
        </form.AppField>
        <form.AppField name="timeRange.to">
          {(field) => (
            <field.TimePickerField
              label="To"
              className="grid grid-cols-[1fr_160px]"
            />
          )}
        </form.AppField>
        <form.SubmitButton className="h-10" ignoreTouched>
          <CircleCheckIcon />
          <span>Complete</span>
        </form.SubmitButton>
      </form.CustomForm>
    </form.AppForm>
  );
};
