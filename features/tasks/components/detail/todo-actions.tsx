import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { useTodoMutation } from '@/features/tasks/hooks/use-todo-mutation';
import { TodoResponse } from '@/features/tasks/types';
import { CheckIcon, Undo2Icon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const TodoActions = ({ todo }: { todo: TodoResponse }) => {
  const router = useRouter();
  const { toggleCompleted } = useTodoMutation();

  return (
    <CardFooter className="grid grid-cols-[1fr_1fr] gap-4">
      <Button
        variant="secondary"
        className="h-10"
        onClick={async () => await toggleCompleted.mutateAsync(todo._id)}
      >
        {todo.completed ? (
          <>
            <XIcon />
            <span>Unmark completed</span>
          </>
        ) : (
          <>
            <CheckIcon />
            <span>Mark as done</span>
          </>
        )}
      </Button>
      <Button
        variant="secondary"
        className="h-10"
        onClick={() => router.back()}
      >
        <Undo2Icon />
        Back to list
      </Button>
    </CardFooter>
  );
};
