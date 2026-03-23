'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2Icon, CircleIcon, FileText } from 'lucide-react';
import { DETAIL_COLUMNS } from '@/features/tasks/constants';
import { TodoResponse } from '@/features/tasks/types';
import { TodoActions } from '@/features/tasks/components/detail/todo-actions';

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

export const TodoInfo = ({ todo }: { todo: TodoResponse }) => {
  return (
    <Card className="overflow-hidden shadow-sm">
      <CardHeader>
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
                <CheckCircle2Icon className="size-3.5" />
                완료
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <CircleIcon className="size-3.5" />
                진행 중
              </span>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
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

        <div className="flex flex-col gap-4">
          {DETAIL_COLUMNS.map((c) => (
            <InfoRow
              key={c.field}
              label={
                <div className="flex gap-2 items-center">
                  <c.Icon className="size-4 text-muted-foreground" />
                  <span>{c.label}</span>
                </div>
              }
              value={c.value(todo[c.field])}
            />
          ))}
        </div>
      </CardContent>

      <TodoActions todo={todo} />
    </Card>
  );
};
