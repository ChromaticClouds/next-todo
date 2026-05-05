'use client';

import { Background } from '@/components/common/background';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function AuthError() {
  const router = useRouter();

  return (
    <Background>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <XIcon />
          </EmptyMedia>
          <h1 className="text-3xl font-bold">500</h1>
          <EmptyTitle>Internal Server Error</EmptyTitle>
          <EmptyDescription>
            There is a problem on server configuration
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            className="bg-foreground text-background"
            onClick={() => router.push('/login')}
          >
            Back to login
          </Button>
        </EmptyContent>
      </Empty>
    </Background>
  );
}
