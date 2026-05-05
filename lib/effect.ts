import { Effect } from 'effect';
import { ApiResponse } from '@/shared/http/api-response';

type TaggedError = {
  _tag: string;
};

type ErrorHandlerMap<E extends TaggedError, R> = {
  [K in E['_tag']]?: (error: Extract<E, { _tag: K }>) => R;
};

type RunEffectOptions<A, E, R> = {
  effect: Effect.Effect<A, E, never>;
  onSuccess: (value: A) => R;
  onError?: E extends TaggedError ? ErrorHandlerMap<E, R> : never;
  onUnexpectedError?: (error: E) => R;
};

export const runEffect = async <A, E, R>({
  effect,
  onSuccess,
  onError,
  onUnexpectedError,
}: RunEffectOptions<A, E, R>) => {
  return Effect.runPromise(
    effect.pipe(
      Effect.map(onSuccess),
      Effect.catchAll((error) => {
        const tag =
          typeof error === 'object' &&
          error !== null &&
          '_tag' in error &&
          typeof error._tag === 'string'
            ? error._tag
            : null;

        if (
          tag &&
          onError &&
          tag in onError &&
          typeof onError[tag as keyof typeof onError] === 'function'
        ) {
          const handler = onError[tag as keyof typeof onError] as (
            error: E,
          ) => R;

          return Effect.succeed(handler(error));
        }

        return Effect.succeed(
          onUnexpectedError
            ? onUnexpectedError(error)
            : (() => {
                throw error;
              })(),
        );
      }),
    ),
  );
};

export const runApiEffect = async <A, E>({
  effect,
  onSuccess,
  onError,
  onUnexpectedError,
}: {
  effect: Effect.Effect<A, E, never>;
  onSuccess: (value: A) => Response;
  onError?: E extends TaggedError ? ErrorHandlerMap<E, Response> : never;
  onUnexpectedError?: (error: E) => Response;
}) => {
  return runEffect({
    effect,
    onSuccess,
    onError,
    onUnexpectedError:
      onUnexpectedError ??
      (() => ApiResponse.internalServerError('Internal server error')),
  });
};