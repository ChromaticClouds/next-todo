import { AppSidebar } from '@/components/common/app-sidebar';
import { Background } from '@/components/common/background';

export const AppContent = ({ children }: React.PropsWithChildren) => {
  return (
    <Background>
      <AppSidebar />
      <main className="w-full h-full flex flex-col items-center mt-20">
        {children}
      </main>
    </Background>
  );
};
