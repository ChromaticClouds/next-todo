'use client';

import { Separator } from '@/components/ui/separator';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type AppTitleProps = {
  title: React.ReactNode;
  description?: string;
};

export const AppTitle = ({ title, description }: AppTitleProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-center relative">
        <nav className="absolute top-1/2 left-0 -translate-y-1/2">
          <button
            onClick={() => router.back()}
            className="rounded-full hover:bg-muted p-2"
          >
            <ArrowLeftIcon size={24} />
          </button>
        </nav>
        <div className='flex flex-col gap-3 justify-center'>
          <h1 className="text-3xl">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <Separator className="my-6" />
    </div>
  );
};
