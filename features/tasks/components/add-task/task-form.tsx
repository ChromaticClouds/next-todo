import { FieldSeparator } from '@/components/ui/field';
import { useTaskForm } from '@/features/tasks/hooks/use-task-form';
import { taskSchema } from '@/features/tasks/schemas/task-schema';
import { PlusIcon } from 'lucide-react';

export const TaskForm = () => {
  const form = useTaskForm();

  return (
    <form.AppForm>
      <form.CustomForm className="space-y-2 w-full gap-4">
        <form.AppField name="title">
          {(field) => (
            <field.TextField
              label="Title"
              showErrorText={false}
              description={`${field.state.value.length}/${taskSchema.shape.title.maxLength}`}
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextField
              label="Description"
              showErrorText={false}
              description={`${field.state.value.length}/${taskSchema.shape.description.maxLength}`}
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
        <form.SubmitButton className="h-10">
          <PlusIcon />
          Add Task
        </form.SubmitButton>
      </form.CustomForm>
    </form.AppForm>
  );
};
