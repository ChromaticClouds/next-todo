import { useFormContext } from '@/components/form';
import { cn } from '@/lib/utils';

type AppFormProps = {
  className?: string;
  hasFile?: boolean;
} & React.PropsWithChildren;

export const CustomForm = ({
  children,
  className,
  hasFile = false,
}: AppFormProps) => {
  const form = useFormContext();

  return (
    <form
      className={cn(`flex flex-col ${className}`)}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      encType={
        hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded'
      }
    >
      {children}
    </form>
  );
};
