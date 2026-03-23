'use client';

import { Button } from '@/components/ui/button';
import {
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from '@/components/ui/field';
import { useLoginForm } from '@/features/auth/hooks/use-login-form';
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export const LoginForm = () => {
  const form = useLoginForm();

  return (
    <form.AppForm>
      <form.CustomForm>
        <FieldGroup>
          <div className="w-full flex flex-col gap-3">
            <Button variant="outline" className="h-10">
              <FontAwesomeIcon icon={faGoogle} />
              <span>Login with Google</span>
            </Button>
            <Button variant="outline" className="h-10">
              <FontAwesomeIcon icon={faXTwitter} />
              <span>Login with X</span>
            </Button>
          </div>
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            Or continue with
          </FieldSeparator>
          <form.AppField name="email">
            {(field) => <field.TextField label="Email" type="email" />}
          </form.AppField>
          <form.AppField name="email">
            {(field) => (
              <field.TextField
                label={
                  <div className="w-full flex justify-between">
                    <span>Password</span>
                    <Link href="/forgot-password" className="hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                }
                type="password"
              />
            )}
          </form.AppField>
          <form.SubmitButton className="h-10" ignoreTouched>
            <LogInIcon />
            <span>Login</span>
          </form.SubmitButton>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{' '}
            <span className="text-primary hover:underline">
              <Link href="/register">Sign up</Link>
            </span>
          </FieldDescription>
        </FieldGroup>
      </form.CustomForm>
    </form.AppForm>
  );
};
