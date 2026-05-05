import { Data } from 'effect';

export class FindAccountError extends Data.TaggedError('FindAccountError') {}

export class FindUserError extends Data.TaggedError('FindUserError')<{
  message?: string;
}> {}

export class SaveOnboardingError extends Data.TaggedError(
  'SaveOnboardingError',
) {}

/**
 * /api/auth/onboarding/register (POST)
 */
export class InvalidProfileFormError extends Data.TaggedError(
  'InvalidProfileFormError',
)<{
  message: string;
}> {}

export class OnboardingTokenNotFoundError extends Data.TaggedError(
  'OnboardingTokenNotFoundError',
)<{
  message: string;
}> {}

export class InvalidOnboardingPayloadError extends Data.TaggedError(
  'InvalidOnboardingPayloadError',
)<{
  message: string;
}> {}

export class InvalidProfileImageError extends Data.TaggedError(
  'InvalidProfileImageError',
)<{
  message: string;
}> {}

export class UploadProfileImageError extends Data.TaggedError(
  'UploadProfileImageError',
)<{
  message: string;
}> {}

export class SaveUserError extends Data.TaggedError('SaveUserError')<{
  message: string;
}> {}

export class ConsumeTokenError extends Data.TaggedError('ConsumeTokenError')<{
  message: string;
}> {}

export class StoreRefreshTokenError extends Data.TaggedError(
  'StoreRefreshTokenError',
)<{ message: string }> {}

export class SupabaseError extends Data.TaggedError('SupabaseError')<{
  message: string;
}> {}

export type CompleteOnboardingError =
  | InvalidProfileFormError
  | OnboardingTokenNotFoundError
  | InvalidOnboardingPayloadError
  | InvalidProfileImageError
  | UploadProfileImageError
  | SaveUserError
  | ConsumeTokenError
  | StoreRefreshTokenError
  | SupabaseError;

/**
 * /api/auth/register (POST)
 */
export class OtpStoreError extends Data.TaggedError('OtpStoreError')<{
  message: string;
}> {}

export class MailSendError extends Data.TaggedError('MailSendError')<{
  message: string;
}> {}

export class NotFoundEmailError extends Data.TaggedError('NotFoundEmailError')<{
  message: string;
}> {}

export class NotFoundUser extends Data.TaggedError('NotFoundUser')<{
  message: string;
}> {}

export class InvalidOtpError extends Data.TaggedError('InvalidOtpError')<{
  message: string;
}> {}

export class UserAlreadyExistsError extends Data.TaggedError(
  'UserAlreadyExistsError',
)<{
  message: string;
}> {}
