import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const AuthFormContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Welcome back</CardTitle>
        <CardDescription>Login with your account</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
