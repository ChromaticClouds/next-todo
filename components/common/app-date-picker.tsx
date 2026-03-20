'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

type AppDatePickerProps = {
  isInvalid?: boolean;
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
};

export const AppDatePicker = ({
  isInvalid = false,
  date,
  setDate,
}: AppDatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-invalid={isInvalid}
          variant="outline"
          data-empty={!date}
          className="w-full flex-1 h-10 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
};
