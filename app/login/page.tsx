import { Background } from '@/components/common/background';
import { AuthFormContainer } from '@/features/auth/components/auth/auth-form-container';
import { LoginForm } from '@/features/auth/components/auth/login-form';

export default function Login() {
  return (
    <Background variant="center">
      <section className="max-w-sm w-full">
        <AuthFormContainer>
          <LoginForm />
        </AuthFormContainer>
      </section>
    </Background>
  );
}
