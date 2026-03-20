import { AppContent } from '@/components/common/app-content';
import { TodoList } from '@/features/tasks/components/tasks/todo-list';
import { TodoProgress } from '@/features/tasks/components/tasks/todo-progress';
import { TodoSearch } from '@/features/tasks/components/tasks/todo-search';

export default function Home() {
  return (
    <AppContent>
      <div className="max-w-md w-full flex flex-col gap-3 p-4">
        <TodoProgress />
        <TodoSearch />
        <TodoList />
      </div>
    </AppContent>
  );
}
