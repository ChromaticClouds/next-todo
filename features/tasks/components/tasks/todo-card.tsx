import { TodoOptions } from '@/features/tasks/components/tasks/todo-options';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { AlarmClockIcon, CheckCircle } from 'lucide-react';
import { TodoResponse } from '@/features/tasks/types';

export const TodoCard = ({ todo }: { todo: TodoResponse }) => {
  return (
    <Card className="p-4 border-border relative">
      <div
        className="absolute -top-6 -right-6 rounded-lg w-12 h-12"
        style={{ backgroundColor: todo.color || 'var(--primary)' }}
      />

      <div className="grid grid-cols-[1fr_20px] gap-3 flex-1 z-1">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold">{todo.title}</span>
              {todo.completed && (
                <Badge>
                  <span>Completed</span>
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

        <TodoOptions todo={todo} />
      </div>
    </Card>
  );
};
