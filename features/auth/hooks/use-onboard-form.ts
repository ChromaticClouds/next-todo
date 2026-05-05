import { useAppForm } from '@/components/form';
import { useMeMutation } from '@/features/auth/hooks/use-me-mutation';
import { useOnboardQuery } from '@/features/auth/hooks/use-onboard-query';
import { OnboardProfilePayload } from '@/features/auth/types';
import { profileSchema } from '@/features/user/schema/profile-schema';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';

type Profile = {
  email: string;
  name: string;
  imageFile?: File;
};

const createProfileValues = (
  data: OnboardProfilePayload | undefined,
): Profile => ({
  email: data?.email ?? '',
  name: data?.name ?? '',
  imageFile: undefined as File | undefined,
});

export const useOnboardForm = () => {
  const router = useRouter();
  const mutation = useMeMutation();
  const { data, isError } = useOnboardQuery();

  return {
    isError,
    form: useAppForm({
      defaultValues: createProfileValues(data),
      validators: { onChange: profileSchema },
      onSubmit: async ({ value }) => {
        try {
          const formData = new FormData();
  
          formData.append('name', value.name);
          if (value.imageFile) formData.append('imageFile', value.imageFile);
  
          await mutation.mutateAsync(formData);
          router.push('/');
        } catch (error) {
          if (error instanceof HTTPError) {
            console.log(await error.response.json());
          }
        }
      },
    }),
  };
};
