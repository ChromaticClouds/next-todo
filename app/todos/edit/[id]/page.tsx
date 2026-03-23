'use client';

import { AppContent } from '@/components/common/app-content';
import { AppTitle } from '@/components/common/app-title';
import { EditTaskForm } from '@/features/tasks/components/edit-task/edit-task-form';
import { EditIcon } from 'lucide-react';
import React from 'react';

export default function TodoEdit({
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
              <EditIcon />
              <span>Edit Task</span>
            </div>
          }
        />
        <EditTaskForm id={id} />
      </div>
    </AppContent>
  );
}
