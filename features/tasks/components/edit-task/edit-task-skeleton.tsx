import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { CircleCheckIcon } from 'lucide-react';

export const EditTaskSkeleton = () => {
  return (
    <div className="space-y-2 w-full flex flex-col gap-4">
      <div className="flex flex-col space-y-3">
        <span className="text-sm font-medium">Title</span>
        <Skeleton className="w-full h-10 border" />
        <span className="text-muted-foreground text-sm">...</span>
      </div>
      <div className="flex flex-col space-y-3">
        <span className="text-sm font-medium">Description</span>
        <Skeleton className="w-full h-10 border" />
        <span className="text-muted-foreground text-sm">...</span>
      </div>
      <Separator className='my-0.5' />
      <div className="flex flex-col space-y-3">
        <span className="text-sm font-medium">From</span>
        <div className="grid grid-cols-[1fr_160px] gap-3">
          <Skeleton className="h-10 border" />
          <Skeleton className="h-10 border" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <span className="text-sm font-medium">To</span>
        <div className="grid grid-cols-[1fr_160px] gap-3">
          <Skeleton className="h-10 border" />
          <Skeleton className="h-10 border" />
        </div>
      </div>
      <Button className="h-10" disabled>
        <CircleCheckIcon />
        <span>Complete</span>
      </Button>
    </div>
  );
};
