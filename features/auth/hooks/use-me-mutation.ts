import { authApi } from '@/features/auth/services/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.postProfile,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['auth', 'me'],
      });
    },
  });
};
