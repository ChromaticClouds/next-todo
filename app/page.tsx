import { AppContent } from '@/components/common/app-content';
import { TodoList } from '@/features/tasks/components/tasks/todo-list';
import { TodoProgress } from '@/features/tasks/components/tasks/todo-progress';
import { TodoSearch } from '@/features/tasks/components/tasks/todo-search';
import { TodoSortMenu } from '@/features/tasks/components/tasks/todo-sort-menu';

export default function Home() {
  return (
    <AppContent>
      <div className="max-w-lg w-full flex flex-col gap-3 p-4">
        <TodoProgress />
        <div className="flex gap-3">
          <TodoSearch />
          <TodoSortMenu />
        </div>
        <TodoList />
      </div>
    </AppContent>
  );
}
