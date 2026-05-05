import { FieldDescription } from '@/components/ui/field';
import Link from 'next/link';
import { AUTH_FORM_ELEMENTS } from '@/features/auth/constants';
import { usePathname } from 'next/navigation';

type SubmitButtonLike = {
  SubmitButton: React.ComponentType<
    React.ComponentProps<'button'> & {
      ignoreTouched?: boolean;
      children?: React.ReactNode;
    }
  >;
};

type AuthFormActionProps = {
  form: SubmitButtonLike;
};

export const AuthFormAction = ({ form }: AuthFormActionProps) => {
  const pathname = usePathname();

  const mode = pathname.startsWith('/login') ? 'login' : 'register';
  const ctx = AUTH_FORM_ELEMENTS[mode];

  return (
    <>
      <form.SubmitButton 
        className="h-10" 
        ignoreTouched={mode === 'login'}
      >
        <ctx.ActionIcon />
        <span>{ctx.buttonText}</span>
      </form.SubmitButton>

      <FieldDescription className="text-center">
        {ctx.footerText}
        <span className="text-primary hover:underline">
          <Link href={ctx.link}>
            {ctx.linkText}
          </Link>
        </span>
      </FieldDescription>
    </>
  );
};
