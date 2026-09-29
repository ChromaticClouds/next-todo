import { useAppForm } from '@/components/form';
import { authApi } from '@/features/auth/services/http';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const defaultValues = {
  otp: '',
};

export const useOtpForm = () => {
  const router = useRouter();

  return useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        await authApi.postOtp(value);
        router.replace('/');
      } catch (err) {
        if (err instanceof HTTPError) {
          const response = await err.response.json<{ message?: string }>();
          toast.error(response.message ?? 'Verification failed');
          return;
        }

        toast.error('Internal server error');
      }
    },
  });
};
