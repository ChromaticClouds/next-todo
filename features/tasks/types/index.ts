export type Todo = {
  title: string;
  description: string;
  color: string;
  timeRange: { from: string; to: string };
};

export type TodoResponse = {
  _id: string;
  completed: boolean;
  startAt: string;
  endAt: string;
  createdAt: string;
} & Omit<Todo, 'timeRange'>;
