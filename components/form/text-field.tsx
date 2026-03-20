import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useFieldContext } from '@/components/form';

type TextFieldProps = {
  label: string;
  type?: string;
  showErrorText?: boolean;
  description?: string;
};

export const TextField = ({
  label,
  type = 'text',
  showErrorText = true,
  description,
}: TextFieldProps) => {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field className="space-y-1">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        type={type}
        className="h-10"
        aria-invalid={isInvalid}
      />
      {description && (
        <FieldDescription
          className={!showErrorText && isInvalid ? 'text-destructive' : ''}
        >
          {description}
        </FieldDescription>
      )}
      {showErrorText && isInvalid && (
        <FieldError errors={field.state.meta.errors} />
      )}
    </Field>
  );
};
