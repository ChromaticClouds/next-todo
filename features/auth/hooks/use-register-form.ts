import { useAppForm } from '@/components/form';
import { registerSchema } from '@/features/auth/schemas/auth-schema';
import { authApi } from '@/features/auth/services/http';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const useRegisterForm = () => {
  const router = useRouter();

  return useAppForm({
    defaultValues,
    validators: { onChange: registerSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        await authApi.postRegisterForm(value);
        formApi.reset();
        router.push('/email/verify');
      } catch (err) {
        if (err instanceof HTTPError) {
          const errResponse = await err.response.json();

          toast.error(
            typeof errResponse?.message === 'string'
              ? errResponse.message
              : 'Unexpected error.',
          );
        }

        toast.error('Server error occurred. Try again later.');
      }
    },
  });
};
