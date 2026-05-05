'use client';

/**
 * Components
 */
import { useFieldContext } from '@/components/form';
import { Field, FieldLabel } from '@/components/ui/field';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

/**
 * Hooks & Utils & Assets
 */
import { useEffect, useState } from 'react';
import { profileSchema } from '@/features/user/schema/profile-schema';
import { CameraIcon, XIcon } from 'lucide-react';

export const ImageField = ({ disabled = false }: { disabled?: boolean }) => {
  const field = useFieldContext<File | undefined>();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const revokeImageUrl = (url?: string) => {
    if (url) URL.revokeObjectURL(url);
  };

  const clearImage = () => {
    revokeImageUrl(imageUrl);
    setImageUrl(undefined);
    field.handleChange(undefined);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = input.files?.[0];

    const result = profileSchema.shape.imageFile.safeParse(file);

    if (!result.success) {
      setErrorMessage(result.error.issues[0]?.message);
      setOpen(true);
      clearImage();
      input.value = '';
      return;
    }

    setErrorMessage(undefined);
    setOpen(false);
    field.handleChange(result.data);

    revokeImageUrl(imageUrl);
    setImageUrl(URL.createObjectURL(result.data!));
    input.value = '';
  };

  useEffect(() => {
    return () => revokeImageUrl(imageUrl);
  }, [imageUrl]);

  return (
    <Field className="my-6 space-y-2 items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg">Error occurred</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button className="h-10">OK</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <div
        className="relative flex items-center justify-center"
        style={{ width: 'max-content' }}
      >
        <FieldLabel
          htmlFor={field.name}
          style={{
            width: '120px',
            height: '120px',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          className="overflow-hidden rounded-full"
        >
          <Avatar style={{ width: '100%', height: '100%' }}>
            <AvatarImage
              src={imageUrl}
              alt="profile-preview"
              className="border-2"
              style={{ objectFit: 'cover' }}
            />
            <AvatarFallback className="flex justify-center border-2 border-dashed">
              <CameraIcon size={42} />
            </AvatarFallback>
          </Avatar>
        </FieldLabel>

        {imageUrl && !disabled && (
          <Button
            type="button"
            style={{
              width: '32px',
              height: '32px',
              bottom: '4px',
              right: '4px',
            }}
            className="absolute w-8 h-8 bottom-1 right-1 rounded-full border bg-muted"
            onClick={clearImage}
          >
            <XIcon size={16} />
          </Button>
        )}

        <Input
          id={field.name}
          type="file"
          disabled={disabled}
          hidden
          onChange={onFileChange}
        />
      </div>
    </Field>
  );
};
