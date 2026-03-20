"use client"

import { Noto_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

/**
 * Providers
 */
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider } from '@/components/ui/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/app/globals.css';

const notoSans = Noto_Sans({ variable: '--font-sans' });

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      className={cn('font-sans', notoSans.variable)}
      suppressHydrationWarning
    >
      <head />
      <body>
        <QueryClientProvider client={client}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </SidebarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
