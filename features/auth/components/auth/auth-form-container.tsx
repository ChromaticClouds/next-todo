'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AUTH_FORM_ELEMENTS } from '@/features/auth/constants';
import { usePathname } from 'next/navigation';

export const AuthFormContainer = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();

  const mode = pathname.startsWith('/login') ? 'login' : 'register';
  const ctx = AUTH_FORM_ELEMENTS[mode];

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">{ctx.title}</CardTitle>
        <CardDescription>{ctx.description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
