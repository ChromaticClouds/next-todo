import { AppContent } from '@/components/common/app-content';
import { TodoList } from '@/features/tasks/components/tasks/todo-list';
import { TodoProgress } from '@/features/tasks/components/tasks/todo-progress';
import { TodoSearch } from '@/features/tasks/components/tasks/todo-search';
import { TodoSortMenu } from '@/features/tasks/components/tasks/todo-sort-menu';
import { TodoSkeleton } from '@/features/tasks/components/tasks/todo-skeleton';
import { Suspense } from 'react';

export default function Home() {
  return (
    <AppContent>
      <div className="max-w-lg w-full flex flex-col gap-3 p-4">
        <TodoProgress />
        <div className="flex gap-3">
          <Suspense fallback={null}>
            <TodoSearch />
          </Suspense>
          <TodoSortMenu />
        </div>
        <Suspense fallback={<TodoSkeleton />}>
          <TodoList />
        </Suspense>
      </div>
    </AppContent>
  );
}
