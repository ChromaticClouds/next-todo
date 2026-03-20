import React from 'react';
import { AppContent } from '@/components/common/app-content';
import { AppTitle } from '@/components/common/app-title';
import { TodoInfo } from '@/features/tasks/components/detail/todo-info';
import { CalendarSearchIcon } from 'lucide-react';

export default function TodoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  return (
    <AppContent>
      <div className="w-md p-4">
        <AppTitle
          title={
            <div className="flex gap-6 items-center">
              <CalendarSearchIcon />
              <span>Task</span>
            </div>
          }
        />
        <TodoInfo id={id} />
      </div>
    </AppContent>
  );
}
