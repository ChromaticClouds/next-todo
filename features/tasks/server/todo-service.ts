import { Effect, Schema } from 'effect';
import { TodoModel } from '@/features/tasks/server/todo-model';
import {
  CreateTodoError,
  DeleteTodoError,
  GetDetailTodoError,
  GetTodosError,
  TodoNotFoundError,
  ToggleCompletedError,
  UpdateTodoError,
} from '@/features/tasks/server/todo-errors';
import { CreateTodoPayloadSchema } from '@/features/tasks/server/todo-validation';
import { ValidationError } from '@/shared/errors/global-error';

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const validationIssues = (message: string) => ({
  formErrors: [message],
  fieldErrors: {},
});

const createSearchFilter = (search: string) => {
  const keyword = escapeRegex(search);

  return {
    $or: [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ],
  };
};

export const todoService = {
  getTodos: (userId: string, search: string) =>
    Effect.tryPromise({
      try: async () =>
        await TodoModel.find({
          ownerId: userId,
          ...createSearchFilter(search),
        })
          .sort({ createdAt: -1 })
          .lean(),
      catch: () => new GetTodosError({}),
    }),

  getDetailTodo: (userId: string, id: string) =>
    Effect.gen(function* () {
      const todo = yield* Effect.tryPromise({
        try: () => TodoModel.findOne({ _id: id, ownerId: userId }),
        catch: (cause) => new GetDetailTodoError({ cause }),
      });

      if (!todo) return yield* Effect.fail(new TodoNotFoundError({ id }));

      return todo;
    }),

  createTodo: (userId: string, input: unknown) =>
    Effect.gen(function* () {
      const parsed = yield* Schema.decodeUnknown(CreateTodoPayloadSchema)(
        input,
      ).pipe(
        Effect.mapError(
          (error) =>
            new ValidationError({ issues: validationIssues(String(error)) }),
        ),
      );

      const startAt = new Date(parsed.timeRange.from);
      const endAt = new Date(parsed.timeRange.to);

      if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime()))
        return yield* Effect.fail(
          new ValidationError({
            issues: validationIssues('Invalid datetime format'),
          }),
        );

      if (startAt > endAt)
        return yield* Effect.fail(
          new ValidationError({
            issues: validationIssues(
              'Start time must be earlier than end time',
            ),
          }),
        );

      const { timeRange, ...rest } = parsed;

      const payload = {
        ownerId: userId,
        startAt: timeRange.from,
        endAt: timeRange.to,
        ...rest,
      };

      return yield* Effect.tryPromise({
        try: async () => await new TodoModel(payload).save(),
        catch: (cause) => new CreateTodoError({ cause }),
      });
    }),

  toggleCompleted: (userId: string, id: string) =>
    Effect.gen(function* () {
      const todo = yield* Effect.tryPromise({
        try: () => TodoModel.findOne({ _id: id, ownerId: userId }),
        catch: (cause) => new ToggleCompletedError({ cause }),
      });

      if (!todo) return yield* Effect.fail(new TodoNotFoundError({ id }));

      todo.completed = !todo.completed;

      return yield* Effect.tryPromise({
        try: () => todo.save(),
        catch: (cause) => new ToggleCompletedError({ cause }),
      });
    }),

  editTodo: (userId: string, id: string, input: unknown) =>
    Effect.gen(function* () {
      const parsed = yield* Schema.decodeUnknown(CreateTodoPayloadSchema)(
        input,
      ).pipe(
        Effect.mapError(
          (error) =>
            new ValidationError({ issues: validationIssues(String(error)) }),
        ),
      );

      const startAt = new Date(parsed.timeRange.from);
      const endAt = new Date(parsed.timeRange.to);

      if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime()))
        return yield* Effect.fail(
          new ValidationError({
            issues: validationIssues('Invalid datetime format'),
          }),
        );

      if (startAt > endAt)
        return yield* Effect.fail(
          new ValidationError({
            issues: validationIssues(
              'Start time must be earlier than end time',
            ),
          }),
        );

      const result = yield* Effect.tryPromise({
        try: () =>
          TodoModel.updateOne(
            { _id: id, ownerId: userId },
            {
              $set: {
                title: parsed.title,
                description: parsed.description,
                startAt,
                endAt,
              },
            },
          ),
        catch: (cause) => new UpdateTodoError({ cause }),
      });

      if (result.matchedCount === 0)
        return yield* Effect.fail(new TodoNotFoundError({ id }));
    }),

  deleteTodo: (userId: string, id: string) =>
    Effect.gen(function* () {
      const result = yield* Effect.tryPromise({
        try: () => TodoModel.deleteOne({ _id: id, ownerId: userId }),
        catch: () => new DeleteTodoError({ id }),
      });

      if (result.deletedCount === 0)
        return yield* Effect.fail(new TodoNotFoundError({ id }));
    }),
};
