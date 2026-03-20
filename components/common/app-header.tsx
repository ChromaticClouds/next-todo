'use client';

import { AppThemeToggle } from '@/components/common/app-theme-toggle';

export const AppHeader = () => {
  return (
    <header className="w-full flex justify-between p-4">
      <span>Todo App</span>
      <AppThemeToggle />
    </header>
  );
};
