import { useAppForm } from '@/components/form';
import { loginSchema } from '@/features/auth/schemas/auth-schema';
import { authApi } from '@/features/auth/services/http';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const defaultValues = {
  email: '',
  password: '',
};

export const useLoginForm = () => {
  const router = useRouter();

  return useAppForm({
    defaultValues,
    validators: { onChange: loginSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        await authApi.postLoginForm(value);
        formApi.reset();
        router.push('/');
      } catch (err) {
        if (err instanceof HTTPError) {
          const errResponse = await err.response.json();

          return toast.error(
            typeof errResponse?.message === 'string'
              ? errResponse?.message
              : 'Unexpected error',
          );
        }

        toast.error('Internal server error.');
      }
    },
  });
};
