/**
 * Assets
 */
import { CircleCheckIcon, PlusIcon, SettingsIcon } from 'lucide-react';

export const SIDEBAR_MAIN_MENU = [
  {
    id: 'tasks',
    name: 'Tasks',
    Icon: CircleCheckIcon,
    path: '/',
  },
  {
    id: 'add',
    name: 'Add Task',
    Icon: PlusIcon,
    path: '/add',
  },
] as const;

export const SIDEBAR_ADDITIONAL = [
  {
    id: 'settings',
    name: 'Settings',
    Icon: SettingsIcon,
    path: '/settings',
  },
] as const;
