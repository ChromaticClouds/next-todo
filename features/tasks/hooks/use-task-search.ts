'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useTransition } from 'react';
import { debounce } from 'es-toolkit/function';

export const useTaskSearch = (delay = 500) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = searchParams.get('search') ?? '';

  const updateQuery = useMemo(() => {
    return debounce((value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = value.trim();

      if (trimmed) params.set('search', trimmed);
      else params.delete('search');

      const next = params.toString();
      const current = searchParams.toString();

      if (next === current) return;

      startTransition(() => {
        router.replace(next ? `${pathname}?${next}` : pathname);
      });
    }, delay);
  }, [delay, pathname, router, searchParams]);

  return { isPending, search, updateQuery };
};
