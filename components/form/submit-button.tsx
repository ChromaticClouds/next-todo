import { useFormContext } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useStore } from '@tanstack/react-form';

type SubmitButtonProps = {
  className?: string;
  variant?: React.ComponentProps<typeof Button>['variant'];
} & React.PropsWithChildren;

export const SubmitButton = ({
  children,
  className,
  variant,
}: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, isTouched, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.isTouched,
    state.canSubmit,
  ]);

  return (
    <Button
      type="submit"
      className={className}
      variant={variant}
      disabled={isSubmitting || !canSubmit || !isTouched}
    >
      {isSubmitting ? <Spinner /> : children}
    </Button>
  );
};
