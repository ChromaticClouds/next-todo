'use client';

import { LoginForm } from '@/features/auth/components/auth/login-form';
import { RegisterForm } from '@/features/auth/components/auth/register-form';
import { usePathname } from 'next/navigation';
import { createContext, useContext } from 'react';

type AuthFormContextParams = {
  mode: 'register' | 'login';
  AuthForm: React.ReactNode;
};

const AuthFormContext = createContext<AuthFormContextParams | null>(null);

export const useAuthFormContext = () => {
  const ctx = useContext(AuthFormContext);
  if (!ctx) throw new Error('AuthFormContext is not called in provider');
  return ctx;
};

export const AuthFormProvider = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();

  const mode = pathname === '/login' ? 'login' : 'register';
  const AuthForm = mode === 'login' ? <LoginForm /> : <RegisterForm />;

  return (
    <AuthFormContext.Provider value={{ mode, AuthForm }}>
      {children}
    </AuthFormContext.Provider>
  );
};
