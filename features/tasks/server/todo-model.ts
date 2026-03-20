import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
}

const TodoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  startAt: {
    type: Date,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const TodoModel: Model<ITodo> =
  mongoose.models.Todo ||
  mongoose.model<ITodo>('Todo', TodoSchema);
