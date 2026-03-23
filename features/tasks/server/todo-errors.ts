import { Data } from 'effect';

export class CreateTodoError extends Data.TaggedError(
  'CreateTodoError',
)<object> {}

export class GetTodosError extends Data.TaggedError('GetTodosError')<object> {}

export class GetDetailTodoError extends Data.TaggedError('GetDetailTodoError')<{
  cause?: unknown;
}> {}

export class TodoNotFoundError extends Data.TaggedError('TodoNotFoundError')<{
  id: string;
}> {}

export class ToggleCompletedError extends Data.TaggedError(
  'ToggleCompletedError',
)<{
  cause?: unknown;
}> {}

export class UpdateTodoError extends Data.TaggedError('UpdateTodoError')<{
  cause?: unknown;
}> {}

export class DeleteTodoError extends Data.TaggedError('DeleteTodoError')<{
  id: string
}> {}
