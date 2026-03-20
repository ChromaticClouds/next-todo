import { useFormContext } from '@/components/form';
import { cn } from '@/lib/utils';

type AppFormProps = {
  className?: string;
} & React.PropsWithChildren;

export const CustomForm = ({ children, className }: AppFormProps) => {
  const form = useFormContext();

  return (
    <form
      className={cn(`flex flex-col ${className}`)}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {children}
    </form>
  );
};
