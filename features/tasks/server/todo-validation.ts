import { Schema } from "effect";

export const CreateTodoPayloadSchema = Schema.Struct({
  title: Schema.String.pipe(Schema.minLength(1), Schema.maxLength(40)),
  description: Schema.String.pipe(Schema.maxLength(300)),
  timeRange: Schema.Struct({ from: Schema.String, to: Schema.String }),
});