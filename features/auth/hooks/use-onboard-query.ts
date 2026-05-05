import { authApi } from '@/features/auth/services/http';
import { useQuery } from '@tanstack/react-query';

export const useOnboardQuery = () => {
  return useQuery({
    queryKey: ['onboard'],
    queryFn: authApi.getOnboardProfile,
    select: (data) => data.data,
  });
};
