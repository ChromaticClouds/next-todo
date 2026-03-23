import { DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTodoMutation } from '@/features/tasks/hooks/use-todo-mutation';
import { TodoResponse } from '@/features/tasks/types';
import {
  BoxSelectIcon,
  CalendarSearch,
  CheckIcon,
  EditIcon,
  EllipsisVerticalIcon,
  PinIcon,
  TrashIcon,
  XIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export const TodoOptions = ({ todo }: { todo: TodoResponse }) => {
  const router = useRouter();
  const { toggleCompleted } = useTodoMutation();

  return (
    <div className="flex justify-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVerticalIcon size={20} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-54">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="h-10 px-2 gap-2"
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
            </DropdownMenuItem>
            <DropdownMenuItem className="h-10 px-2 gap-2">
              <PinIcon />
              <span>Pin</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="h-10 px-2 gap-2">
              <BoxSelectIcon />
              <span>Select</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="h-10 px-2 gap-2"
              onClick={() => router.push(`/todos/${todo._id}`)}
            >
              <CalendarSearch />
              <span>Detail</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="h-10 px-2 gap-2"
              onClick={() => router.push(`/todos/edit/${todo._id}`)}
            >
              <EditIcon />
              <span>Edit task</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DialogTrigger asChild>
              <DropdownMenuItem
                variant="destructive"
                className="h-10 px-2 gap-2"
              >
                <TrashIcon />
                <span>Delete</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
