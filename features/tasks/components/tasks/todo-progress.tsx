import { TodoChart } from '@/features/tasks/components/tasks/todo-chart';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

export const TodoProgress = () => {
  return (
    <Card className="flex-row p-4">
      <div className="flex gap-4 items-center">
        <TodoChart />
        <div>
          <CardTitle>Let&apos;s do something</CardTitle>
          <CardDescription>Here we go</CardDescription>
        </div>
      </div>
    </Card>
  );
};
