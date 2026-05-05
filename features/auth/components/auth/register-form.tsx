'use client';

import { FieldGroup, FieldSeparator } from '@/components/ui/field';
import { AuthFormAction } from '@/features/auth/components/auth/auth-form-action';
import { SocialAuthAction } from '@/features/auth/components/auth/social-auth-action';
import { useRegisterForm } from '@/features/auth/hooks/use-register-form';

export const RegisterForm = () => {
  const form = useRegisterForm();

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
          <form.AppField name="name">
            {(field) => <field.TextField label="Name" type="name" />}
          </form.AppField>
          <form.AppField name="password">
            {(field) => <field.TextField label="Password" type="password" />}
          </form.AppField>
          <form.AppField name="confirmPassword">
            {(field) => (
              <field.TextField label="Confirm password" type="password" />
            )}
          </form.AppField>

          <AuthFormAction form={form} />
        </FieldGroup>
      </form.CustomForm>
    </form.AppForm>
  );
};
