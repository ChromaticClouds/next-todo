import { NotFound } from '@/assets/not-found';
import { Card, CardContent } from '@/components/ui/card';

export const TodoNotFound = () => {
  return (
    <Card className="border-muted-foreground border-dashed shadow-sm border-2">
      <CardContent className="flex min-h-40 flex-col items-center justify-center p-6 gap-3">
        <NotFound />
        <span className="text-6xl font-bold">404</span>
        <p className="text-sm text-muted-foreground">
          할 일 정보를 불러오지 못했습니다.
        </p>
      </CardContent>
    </Card>
  );
};
