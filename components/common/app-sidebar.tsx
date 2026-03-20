'use client';

/**
 * Components
 */
import { AppThemeToggle } from '@/components/common/app-theme-toggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

/**
 * Constants
 */
import { SIDEBAR_ADDITIONAL, SIDEBAR_MAIN_MENU } from '@/constants';

/**
 * Hooks
 */
import { useRouter } from 'next/navigation';

export const AppSidebar = () => {
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <span>Todo App</span>
          <AppThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_MAIN_MENU.map((s) => (
                <SidebarMenuItem key={s.id}>
                  <SidebarMenuButton onClick={() => router.push(s.path)}>
                    <s.Icon />
                    {s.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Additional</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ADDITIONAL.map((s) => (
                <SidebarMenuItem key={s.id}>
                  <SidebarMenuButton onClick={() => router.push(s.path)}>
                    <s.Icon />
                    {s.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};
