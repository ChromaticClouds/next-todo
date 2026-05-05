'use client';

import { FieldGroup } from '@/components/ui/field';
import { useOnboardForm } from '@/features/auth/hooks/use-onboard-form';
import { profileSchema } from '@/features/user/schema/profile-schema';
import { useRouter } from 'next/navigation';

export const OnboardForm = () => {
  const { form, isError } = useOnboardForm();
  const router = useRouter();

  return (
    <form.AppForm>
      <form.CustomForm hasFile>
        {isError && (
          <div
            style={{ backgroundColor: 'var(--destructive)' }}
            className="w-full p-2 rounded-lg flex flex-col"
          >
            <p>Unexpected error occurred</p>
            <p
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => router.push('/login')}
            >
              Back to continue
            </p>
          </div>
        )}
        <FieldGroup>
          <form.AppField name="imageFile">
            {(field) => <field.ImageField disabled={isError} />}
          </form.AppField>
          <form.AppField name="email">
            {(field) => <field.TextField label="email" type="email" disabled />}
          </form.AppField>
          <form.AppField name="name">
            {(field) => (
              <field.TextField
                label="Username"
                description={`${field.state.value.length ?? 0}/${profileSchema.shape.name.maxLength}`}
                showErrorText={false}
              />
            )}
          </form.AppField>
          <form.SubmitButton className="h-10" ignoreTouched>
            Register Account
          </form.SubmitButton>
        </FieldGroup>
      </form.CustomForm>
    </form.AppForm>
  );
};
