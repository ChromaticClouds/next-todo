import { useAppForm } from '@/components/form';
import { authApi } from '@/features/auth/services/http';
import { api } from '@/services/api';
import { HTTPError } from 'ky';

const defaultValues = {
  otp: '',
};

export const useOtpForm = () =>
  useAppForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      try {
        await authApi.postOtp(value);
        console.log('validation success')
      } catch (err) {
        if (err instanceof HTTPError) {
          console.log(await err.response.json());
        }
      }
    },
  });
