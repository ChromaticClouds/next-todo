'use client';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { TodoCard } from '@/features/tasks/components/tasks/todo-card';
import { AppEmpty } from '@/features/tasks/components/tasks/todo-empty';
import { TodoSkeleton } from '@/features/tasks/components/tasks/todo-skeleton';

/**
 * Queries
 */
import { todoQueries } from '@/features/tasks/query';

/**
 * Hooks
 */
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

/**
 * Assets
 */
import {
  CalendarXIcon,
  PlusIcon,
  RotateCcwIcon,
  XIcon,
} from 'lucide-react';

export const TodoList = () => {
  const params = useSearchParams();

  const {
    data: todos = [],
    isPending,
    isError,
    refetch,
  } = useQuery(todoQueries.list({ search: params.get('search') ?? '' }));

  if (isPending) return <TodoSkeleton />;

  if (isError)
    return (
      <div className="h-150 flex border-2 rounded-lg border-dashed border-muted">
        <AppEmpty
          Icon={XIcon}
          title="Task load Error"
          description="An error occurred while loading tasks"
          content={
            <div className="flex flex-col gap-3 items-center my-2">
              <Button size="icon-lg" onClick={() => refetch()}>
                <RotateCcwIcon />
              </Button>
              <span className="text-muted-foreground">Reload</span>
            </div>
          }
        />
      </div>
    );

  return (
    <div className="max-h-150 flex flex-col gap-3 overflow-y-auto">
      {todos.length !== 0 ? (
        todos.map((todo) => <TodoCard key={todo._id} todo={todo} />)
      ) : (
        <div className="border-2 h-150 flex rounded-lg border-dashed border-muted">
          <AppEmpty
            Icon={CalendarXIcon}
            title="No tasks"
            description="There is no task"
            content={
              !params.get('search') && (
                <Button>
                  <PlusIcon />
                  <span>Add task</span>
                </Button>
              )
            }
          />
        </div>
      )}
    </div>
  );
};
