'use client';

import { ChartContainer } from '@/components/ui/chart';
import { Cell, Pie, PieChart } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { todoQueries } from '@/features/tasks/query';
import { useMemo } from 'react';
import { TodoResponse } from '@/features/tasks/types';

const config = {
  progress: {
    label: 'Progress',
    color: 'var(--chart-2)',
  },
  remaining: {
    label: 'Remaining',
    color: 'var(--muted)',
  },
};

const calculateRate = (todos: TodoResponse[]) => {
  const totalCount = todos.length;
  const completed = todos.filter((t) => t.completed).length;

  return Math.round((completed / totalCount) * 100);
};

export const TodoChart = () => {
  const { data: todos = [] } = useQuery(todoQueries.list({}));

  const chartData = useMemo(() => {
    const rate = calculateRate(todos);

    return [
      { name: 'progress', value: rate, fill: config.progress.color },
      { name: 'remaining', value: 100 - rate, fill: config.remaining.color },
    ];
  }, [todos]);

  return (
    <ChartContainer config={config} className="relative w-18 h-18">
      <PieChart>
        <Pie
          data={chartData}
          nameKey="name"
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius="80%"
          outerRadius="110%"
          startAngle={90}
          endAngle={-270}
          cornerRadius={60}
          stroke="none"
        >
          {chartData.map((_, index) => (
            <Cell key={index} />
          ))}
        </Pie>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm fill-foreground"
        >
          {calculateRate(todos) || 0}%
        </text>
      </PieChart>
    </ChartContainer>
  );
};
