import { ApiResponse } from '@/shared/http/api-response';
import { Effect } from 'effect';

type ErrorHandlerMap = Record<string, (error: unknown) => Response>;

type RunApiEffectOptions<A> = {
  effect: Effect.Effect<A, unknown, never>;
  onSuccess: (value: A) => Response;
  onError?: ErrorHandlerMap;
  onUnexpectedError?: (error: unknown) => Response;
};

export const runApiEffect = async <A>({
  effect,
  onSuccess,
  onError = {},
  onUnexpectedError,
}: RunApiEffectOptions<A>) => {
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

        if (tag && onError[tag]) return Effect.succeed(onError[tag](error));

        return Effect.succeed(
          onUnexpectedError?.(error) ??
            ApiResponse.internalServerError('Internal server error'),
        );
      }),
    ),
  );
};
