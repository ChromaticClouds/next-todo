"use client"

import { CalendarDaysIcon } from "lucide-react";

const formatDateTime = (value: string) => {
  return new Date(value).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const DETAIL_COLUMNS = [
  {
    field: 'startAt',
    label: 'Start At',
    value: (value: string) => formatDateTime(value),
    Icon: CalendarDaysIcon,
  },
  {
    field: 'endAt',
    label: 'End At',
    value: (value: string) => formatDateTime(value),
    Icon: CalendarDaysIcon,
  },
  {
    field: 'createdAt',
    label: 'Created At',
    value: (value: string) => formatDateTime(value),
    Icon: CalendarDaysIcon,
  },
] as const;
