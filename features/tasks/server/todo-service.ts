import { Effect, Schema } from 'effect';
import { TodoModel } from '@/features/tasks/server/todo-model';
import {
  CreateTodoError,
  GetDetailTodoError,
  GetTodosError,
  TodoNotFoundError,
  ToggleCompletedError,
} from '@/features/tasks/server/todo-errors';
import { CreateTodoPayloadSchema } from '@/features/tasks/server/todo-schema';
import { ValidationError } from '@/shared/errors/global-error';

export const todoService = {
  getTodos: () => {
    return Effect.tryPromise({
      try: async () => await TodoModel.find().sort({ createdAt: -1 }).lean(),
      catch: () => new GetTodosError({}),
    });
  },

  getDetailTodo: (id: string) => {
    return Effect.gen(function* () {
      const todo = yield* Effect.tryPromise({
        try: () => TodoModel.findById(id),
        catch: (cause) => new GetDetailTodoError({ cause }),
      });

      if (!todo) return yield* Effect.fail(new TodoNotFoundError({ id }));

      return todo;
    });
  },

  createTodo: (input: unknown) => {
    return Effect.gen(function* () {
      const parsed = yield* Schema.decodeUnknown(CreateTodoPayloadSchema)(
        input,
      ).pipe(
        Effect.mapError(
          (error) => new ValidationError({ issues: [String(error)] }),
        ),
      );

      const startAt = new Date(parsed.timeRange.from);
      const endAt = new Date(parsed.timeRange.to);

      if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime()))
        return yield* Effect.fail(
          new ValidationError({ issues: ['Invalid datetime format'] }),
        );

      if (startAt > endAt)
        return yield* Effect.fail(
          new ValidationError({
            issues: ['Start time must be earlier than end time'],
          }),
        );

      const { timeRange, ...rest } = parsed;

      const payload = {
        startAt: timeRange.from,
        endAt: timeRange.to,
        ...rest,
      };

      return yield* Effect.tryPromise({
        try: async () => await new TodoModel(payload).save(),
        catch: (cause) => new CreateTodoError({ cause }),
      });
    });
  },

  toggleCompleted: (id: string) => {
    return Effect.gen(function* () {
      const todo = yield* Effect.tryPromise({
        try: () => TodoModel.findById(id),
        catch: (cause) => new ToggleCompletedError({ cause }),
      });

      if (!todo) return yield* Effect.fail(new TodoNotFoundError({ id }));

      todo.completed = !todo.completed;

      return yield* Effect.tryPromise({
        try: () => todo.save(),
        catch: (cause) => new ToggleCompletedError({ cause }),
      });
    });
  },
};
