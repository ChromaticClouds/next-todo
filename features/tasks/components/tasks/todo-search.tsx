import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { SearchIcon, SortDescIcon } from 'lucide-react';

export const TodoSearch = () => {
  return (
    <div className="flex gap-3">
      <InputGroup className="h-12 p-2 min-w-0 border-border">
        <InputGroupInput placeholder="Search for task..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-12 w-12">
            <SortDescIcon className="size-5!" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuItem>
            Sort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
