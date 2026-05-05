'use client';

import { FieldGroup, FieldSeparator } from '@/components/ui/field';
import { AuthFormAction } from '@/features/auth/components/auth/auth-form-action';
import { SocialAuthAction } from '@/features/auth/components/auth/social-auth-action';
import { useLoginForm } from '@/features/auth/hooks/use-login-form';
import Link from 'next/link';

export const LoginForm = () => {
  const form = useLoginForm();

  return (
    <form.AppForm>
      <form.CustomForm>
        <FieldGroup>
          <SocialAuthAction />

          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            Or continue with
          </FieldSeparator>

          <form.AppField name="email">
            {(field) => <field.TextField label="Email" type="email" />}
          </form.AppField>
          <form.AppField name="password">
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

          <AuthFormAction form={form} />
        </FieldGroup>
      </form.CustomForm>
    </form.AppForm>
  );
};
