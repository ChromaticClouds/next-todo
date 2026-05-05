import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const OnboardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="max-w-sm w-full py-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile register</CardTitle>
          <CardDescription>
            Set the profile for assigning account
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};
