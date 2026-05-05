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
import { Todo } from '@/features/tasks/types';

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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
  getTodos: (search: string) =>
    Effect.tryPromise({
      try: async () =>
        await TodoModel.find(createSearchFilter(search))
          .sort({ createdAt: -1 })
          .lean(),
      catch: () => new GetTodosError({}),
    }),

  getDetailTodo: (id: string) =>
    Effect.gen(function* () {
      const todo = yield* Effect.tryPromise({
        try: () => TodoModel.findById(id),
        catch: (cause) => new GetDetailTodoError({ cause }),
      });

      if (!todo) return yield* Effect.fail(new TodoNotFoundError({ id }));

      return todo;
    }),

  createTodo: (input: unknown) =>
    Effect.gen(function* () {
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
    }),

  toggleCompleted: (id: string) =>
    Effect.gen(function* () {
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
    }),

  editTodo: (id: string, todo: Todo) =>
    Effect.gen(function* () {
      return yield* Effect.tryPromise({
        try: () => TodoModel.updateOne({ _id: id }, { $set: todo }),
        catch: (cause) => new UpdateTodoError({ cause }),
      });
    }),

  deleteTodo: (id: string) =>
    Effect.gen(function* () {
      return yield* Effect.tryPromise({
        try: () => TodoModel.deleteOne({ _id: id }),
        catch: () => new DeleteTodoError({ id }),
      });
    }),
};
