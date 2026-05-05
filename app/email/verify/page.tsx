'use client';

import { Background } from '@/components/common/background';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EmailOtpForm } from '@/features/auth/components/email/email-otp-form';
import { EmailGuard } from '@/features/auth/guards';
import { useEmailQuery } from '@/features/auth/hooks/use-email-query';

export default function EmailVerify() {
  const { data: email } = useEmailQuery();

  return (
    <EmailGuard>
      <Background variant="center">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>
              Enter the verification code we sent to your email address:{' '}
              <span className="font-medium">{email}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmailOtpForm />
          </CardContent>
        </Card>
      </Background>
    </EmailGuard>
  );
}
