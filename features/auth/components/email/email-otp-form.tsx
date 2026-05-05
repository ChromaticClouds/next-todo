import { Field, FieldLabel } from '@/components/ui/field';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useOtpForm } from '@/features/auth/hooks/use-otp-form';

export const EmailOtpForm = () => {
  const form = useOtpForm();

  return (
    <form.AppForm>
      <form.CustomForm className="gap-6">
        <form.AppField name="otp">
          {(field) => (
            <Field className="space-y-2">
              <FieldLabel htmlFor="otp-verification">
                Verification Code
              </FieldLabel>
              <InputOTP
                maxLength={6}
                id="otp-verification"
                required
                value={field.state.value}
                onChange={(e) => field.handleChange(e)}
              >
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-2" />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Field>
          )}
        </form.AppField>
        <form.SubmitButton className="h-10 w-full">Verify</form.SubmitButton>
      </form.CustomForm>
    </form.AppForm>
  );
};
