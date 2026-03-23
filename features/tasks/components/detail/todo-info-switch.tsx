"use client"

import { TodoInfo } from '@/features/tasks/components/detail/todo-info';
import { TodoInfoSkeleton } from '@/features/tasks/components/detail/todo-info-skeleton';
import { TodoNotFound } from '@/features/tasks/components/detail/todo-not-found';
import { todoQueries } from '@/features/tasks/query';
import { useQuery } from '@tanstack/react-query';

export const TodoInfoSwitch = ({ id }: { id: string }) => {
  const { data: todo, isPending, isError } = useQuery(todoQueries.detail(id));

  if (isPending) return <TodoInfoSkeleton />;

  if (isError || !todo) return <TodoNotFound />;

  return <TodoInfo todo={todo} />;
};
