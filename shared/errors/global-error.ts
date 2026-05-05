import { Data } from 'effect';

type IssuesType<T, U = string> = {
  formErrors: U[];
  fieldErrors: { [P in keyof T]?: U[] };
};

export class ValidationError<T> extends Data.TaggedError('ValidationError')<{
  issues: IssuesType<T>;
}> {}
