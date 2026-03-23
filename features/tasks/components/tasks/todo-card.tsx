"use client"

/**
 * Components
 */
import { TodoOptions } from '@/features/tasks/components/tasks/todo-options';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { AlarmClockIcon, CheckCircle } from 'lucide-react';
import { TodoResponse } from '@/features/tasks/types';
import { Dialog } from '@/components/ui/dialog';
import { TodoDeleteDialog } from '@/features/tasks/components/tasks/todo-delete-dialog';

/**
 * Hooks
 */
import { useIsMobile } from '@/hooks/use-mobile';

export const TodoCard = ({ todo }: { todo: TodoResponse }) => {
  const isMobile = useIsMobile();

  return (
    <Card
      className={`p-4 border-border relative transition-colors shrink-0
        ${todo.completed ? 'bg-muted' : 'bg-card'}`}
    >
      <div
        className="absolute -top-6 -right-6 rounded-lg w-12 h-12"
        style={{ backgroundColor: todo.color || 'var(--primary)' }}
      />

      <div className="grid grid-cols-[1fr_20px] gap-3 flex-1 z-1">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span
                className={`${todo.completed ? 'max-w-50' : 'max-w-76'} text-lg font-bold truncate`}
              >
                {todo.title}
              </span>
              {todo.completed && (
                <Badge className={isMobile ? 'w-5 h-5 p-0' : ''}>
                  {!isMobile && <span>Completed</span>}
                  <CheckCircle />
                </Badge>
              )}
            </div>
            {/* Register Date */}
            <time>{new Date(todo.createdAt).toLocaleDateString()}</time>
          </div>
          <p className="text-ellipsis">{todo.description}</p>
          {/* Time deadline */}
          <div className="flex gap-3 items-center text-muted-foreground">
            <AlarmClockIcon size={16} />
            <time>
              {new Date(todo.endAt).toLocaleDateString()} •{' '}
              {new Date(todo.endAt).toLocaleTimeString()} • Today
            </time>
          </div>
        </div>

        <Dialog>
          <TodoOptions todo={todo} />
          <TodoDeleteDialog todo={todo} />
        </Dialog>
      </div>
    </Card>
  );
};
