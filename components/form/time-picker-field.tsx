'use client';

import { AppDatePicker } from '@/components/common/app-date-picker';
import { useFieldContext } from '@/components/form';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type CalendarFieldProps = {
  label: string;
  className?: string;
  description?: string;
};

const mergeDateAndTime = (baseDate: Date | undefined, time: string) => {
  const date = baseDate ? new Date(baseDate) : new Date();

  const [hours = '0', minutes = '0', seconds = '0'] = time.split(':');

  date.setHours(Number(hours), Number(minutes), Number(seconds), 0);
  return date;
};

const formatTime = (date?: Date) => {
  if (!date) return '01:00:00';

  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
};

export const TimePickerField = ({
  label,
  className,
  description,
}: CalendarFieldProps) => {
  const field = useFieldContext<Date>();
  const value = field.state.value;

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field className="space-y-1">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <div className={`gap-3 ${className}`}>
        <AppDatePicker
          isInvalid={isInvalid}
          date={value}
          setDate={(nextDate) => {
            if (!nextDate) return;
            const nextValue = mergeDateAndTime(nextDate, formatTime(value));
            field.handleChange(nextValue);
          }}
        />

        <Input
          aria-invalid={isInvalid}
          type="time"
          id="time-from"
          step="1"
          className="h-10 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          value={formatTime(value)}
          onChange={(e) => {
            const nextValue = mergeDateAndTime(value, e.target.value);
            field.handleChange(nextValue);
          }}
        />
      </div>

      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
