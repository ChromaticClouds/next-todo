import mongoose, { Document, Schema, Model } from 'mongoose';

interface IUser extends Document {
  provider: 'local' | 'google';
  providerAccountId?: string;
  email: string;
  name: string;
  passwordHash: string | null;
  imagePath?: string;
}

const userSchema = new Schema(
  {
    provider: {
      type: String,
      enum: ['local', 'google'],
      required: true,
    },
    providerAccountId: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      default: null,
    },
    imagePath: {
      type: String,
      default: undefined,
    },
  },
  {
    strict: 'throw',
    timestamps: true,
  },
);

userSchema.index(
  { provider: 1, providerAccountId: 1 },
  {
    unique: true,
    partialFilterExpression: { providerAccountId: { $type: 'string' } },
  },
);

userSchema.index(
  { provider: 1, email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $type: 'string' } },
  },
);

export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);