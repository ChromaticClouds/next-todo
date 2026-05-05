import { AppLoading } from '@/components/common/app-loading';
import { useEmailQuery } from '@/features/auth/hooks/use-email-query';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const EmailGuard = ({ children }: React.PropsWithChildren) => {
  const { isFetching, isError, error } = useEmailQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isError || !(error instanceof HTTPError)) return;

    error.response
      .json<{ message?: string }>()
      .then((res) => toast.error(res?.message ?? 'Unexpected error'))
      .catch(() => toast.error('Unexpected error'))
      .finally(() => router.replace('/login'));
  }, [isError, error, router]);

  if (isFetching) return <AppLoading />;

  if (error) return null;

  return children;
};
