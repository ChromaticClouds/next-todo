import { useFormContext } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useStore } from '@tanstack/react-form';

type SubmitButtonProps = {
  className?: string;
  variant?: React.ComponentProps<typeof Button>['variant'];
  ignoreTouched?: boolean;
} & React.PropsWithChildren;

export const SubmitButton = ({
  children,
  className,
  variant,
  ignoreTouched = false,
}: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, isTouched, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.isTouched,
    state.canSubmit,
  ]);

  const touchCondition = ignoreTouched ? false : !isTouched

  return (
    <Button
      type="submit"
      className={className}
      variant={variant}
      disabled={isSubmitting || !canSubmit || touchCondition}
    >
      {isSubmitting ? <Spinner /> : children}
    </Button>
  );
};
