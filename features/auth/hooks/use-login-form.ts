import { useAppForm } from '@/components/form';
import z from 'zod';

const defaultValues = {
  email: '',
  password: '',
};

const loginSchema = z.object({
  email: z.string().min(1, 'Enter the email'),
  password: z.string().min(1, 'Enter the password'),
});

export const useLoginForm = () => {
  return useAppForm({
    defaultValues,
    validators: { onSubmit: loginSchema },
    onSubmit: ({ value, formApi }) => {
      console.log(value);
    },
  });
};
