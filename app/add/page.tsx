'use client';

import { AppContent } from '@/components/common/app-content';
import { AppTitle } from '@/components/common/app-title';
import { TaskForm } from '@/features/tasks/components/add-task/task-form';
import { CalendarIcon } from 'lucide-react';

export default function AddTask() {
  return (
    <AppContent>
      <div className="w-md p-4">
        <AppTitle
          title={
            <div className="flex gap-6 items-center">
              <CalendarIcon size={30} />
              <p>Add Task</p>
            </div>
          }
        />
        <TaskForm />
      </div>
    </AppContent>
  );
}
