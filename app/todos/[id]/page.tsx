import React from 'react';
import { AppContent } from '@/components/common/app-content';
import { AppTitle } from '@/components/common/app-title';
import { CalendarSearchIcon } from 'lucide-react';
import { TodoInfoSwitch } from '@/features/tasks/components/detail/todo-info-switch';

export default function TodoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  return (
    <AppContent>
      <div className="max-w-lg w-full p-4">
        <AppTitle
          title={
            <div className="flex gap-6 items-center">
              <CalendarSearchIcon />
              <span>Task</span>
            </div>
          }
        />
        <TodoInfoSwitch id={id} />
      </div>
    </AppContent>
  );
}
