"use client"

import { TodoCard } from '@/features/tasks/components/tasks/todo-card';
import { TodoSkeleton } from '@/features/tasks/components/tasks/todo-skeleton';
import { todoQueries } from '@/features/tasks/query';
import { useQuery } from '@tanstack/react-query';

export const TodoList = () => {
  const { data: todos = [], isPending, isError } = useQuery(todoQueries.all());

  if (isPending) return <TodoSkeleton />;

  if (isError) {
    return <div>할 일을 불러오지 못했습니다.</div>;
  }

  if (todos.length === 0) {
    return <div>등록된 할 일이 없습니다.</div>;
  }

  return (
    <>
      {todos.map((todo) => (
        <TodoCard key={todo._id} todo={todo} />
      ))}
    </>
  );
};
