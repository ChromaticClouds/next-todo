'use client';

import { todoQueries } from '@/features/tasks/query';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CalendarDays,
  CalendarDaysIcon,
  CheckCircle2,
  Circle,
  FileText,
} from 'lucide-react';

const formatDateTime = (value: string) => {
  return new Date(value).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const InfoRow = ({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl border bg-muted/30 p-4">
      <span className="text-sm font-medium tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  );
};

const TodoInfoSkeleton = () => {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-48 rounded-lg" />
            <Skeleton className="h-4 w-28 rounded-lg" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Skeleton className="h-24 w-full rounded-2xl" />

        <div className="grid gap-3 md:grid-cols-2">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
      </CardContent>
    </Card>
  );
};

export const TodoInfo = ({ id }: { id: string }) => {
  const { data, isPending, isError } = useQuery(todoQueries.detail(id));

  if (isPending) {
    return <TodoInfoSkeleton />;
  }

  if (isError || !data?.data) {
    return (
      <Card className="border-destructive/30 shadow-sm">
        <CardContent className="flex min-h-40 items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">
            할 일 정보를 불러오지 못했습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  const todo = data.data;

  return (
    <Card className="overflow-hidden border-border/60 shadow-sm">
      <CardHeader className="gap-4 bg-linear-to-b from-muted/40 to-background">
        <div className="flex flex-col gap-4 items-center">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              {todo.title}
            </CardTitle>
          </div>

          <Badge
            variant={todo.completed ? 'default' : 'secondary'}
            className="h-8 rounded-full px-3 text-xs"
          >
            {todo.completed ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                완료
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Circle className="size-3.5" />
                진행 중
              </span>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-6 py-2">
        <div className="rounded-2xl bg-muted/30 p-4 border">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FileText className="size-4" />
            Description
          </div>
          <p className="whitespace-pre-wrap wrap-break-word text-sm text-foreground">
            {todo.description || '설명이 없습니다.'}
          </p>
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <InfoRow
            label={
              <div className="flex gap-2 items-center">
                <CalendarDaysIcon className="size-4 text-muted-foreground" />
                <span>Start At</span>
              </div>
            }
            value={formatDateTime(todo.startAt)}
          />
          <InfoRow
            label={
              <div className="flex gap-2 items-center">
                <CalendarDaysIcon className="size-4 text-muted-foreground" />
                <span>End At</span>
              </div>
            }
            value={formatDateTime(todo.endAt)}
          />
          <InfoRow
            label={
              <div className="flex gap-2 items-center">
                <CalendarDaysIcon className="size-4 text-muted-foreground" />
                <span>Created At</span>
              </div>
            }
            value={formatDateTime(todo.createdAt)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
