'use client';

/**
 * Components
 */
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';

/**
 * Hooks
 */
import { useTaskSearch } from '@/features/tasks/hooks/use-task-search';

/**
 * Assets
 */
import { SearchIcon } from 'lucide-react';

export const TodoSearch = () => {
  const { search, updateQuery, isPending } = useTaskSearch();

  return (
    <InputGroup className="h-12 p-2 min-w-0 border-border">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Search for task..."
        defaultValue={search}
        onChange={(e) => updateQuery(e.target.value)}
      />
      <InputGroupAddon align="inline-end">
        {isPending && <Spinner />}
      </InputGroupAddon>
    </InputGroup>
  );
};
