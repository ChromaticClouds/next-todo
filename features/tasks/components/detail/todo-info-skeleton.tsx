import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const TodoInfoSkeleton = () => {
  return (
    <Card className="border-border/60 shadow-sm px-2 py-6">
      <CardHeader className="space-y-3 gap-4">
        <div className="flex flex-col gap-3 items-center">
          <Skeleton className="h-7 w-48 rounded-lg" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Skeleton className="h-20 w-full rounded-2xl" />

        <Separator />

        <div className="flex flex-col gap-3">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
      </CardContent>
    </Card>
  );
};