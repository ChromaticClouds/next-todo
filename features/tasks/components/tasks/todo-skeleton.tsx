import { Skeleton } from '@/components/ui/skeleton';

export const TodoSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton
          key={i}
          className={`h-28 rounded-xl`}
        />
      ))}
    </div>
  );
};
