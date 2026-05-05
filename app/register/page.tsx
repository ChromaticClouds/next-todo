import { Background } from '@/components/common/background';
import { AuthFormContainer } from '@/features/auth/components/auth/auth-form-container';
import { RegisterForm } from '@/features/auth/components/auth/register-form';

export default function Register() {
  return (
    <Background variant="center" className="overflow-y-auto">
      <section className="max-w-sm w-full max-h-full my-auto">
        <div className="py-4 shrink-0">
          <AuthFormContainer>
            <RegisterForm />
          </AuthFormContainer>
        </div>
      </section>
    </Background>
  );
}
