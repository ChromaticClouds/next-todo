import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTodoMutation } from '@/features/tasks/hooks/use-todo-mutation';
import { TodoResponse } from '@/features/tasks/types';
import { toast } from 'sonner';

export const TodoDeleteDialog = ({ todo }: { todo: TodoResponse }) => {
  const { deleteTodo: mutation } = useTodoMutation();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogDescription>Do you want to delete this task?</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col space-y-2">
          <span className="text-muted-foreground">Title</span>
          <p className="rounded-lg border border-muted-foreground/30 p-2">
            {todo.title}
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-muted-foreground">Description</span>
          <p className="rounded-lg border border-muted-foreground/30 p-2">
            {todo.description}
          </p>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            onClick={async () => {
              const response = await mutation.mutateAsync(todo._id);
              toast.success(response.message);
            }}
          >
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
