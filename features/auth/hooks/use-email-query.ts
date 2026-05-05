import { emailQueryKey } from '@/features/auth/query';
import { authApi } from '@/features/auth/services/http';
import { useQuery } from '@tanstack/react-query';

export const useEmailQuery = () => useQuery({
  queryKey: emailQueryKey,
  queryFn: authApi.getEmail,
  select: (data) => data.data,
  retry: 0,
});
