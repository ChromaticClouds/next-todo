import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ITodo extends Document {
  ownerId: Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
}

const TodoSchema: Schema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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

TodoSchema.index({ ownerId: 1, createdAt: -1 });

export const TodoModel: Model<ITodo> =
  mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);
