import { CustomForm } from '@/components/form/custom-form';
import { ImageField } from '@/components/form/image-field';
import { SubmitButton } from '@/components/form/submit-button';
import { TextField } from '@/components/form/text-field';
import { TimePickerField } from '@/components/form/time-picker-field';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    TimePickerField,
    ImageField,
  },
  formComponents: {
    CustomForm,
    SubmitButton,
  },
  fieldContext,
  formContext,
});
