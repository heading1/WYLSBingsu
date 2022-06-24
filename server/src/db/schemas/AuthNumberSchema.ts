import { Schema } from 'mongoose';

const AuthNumberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    authNumber: {
      type: String,
      required: true,
    },
    flag: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        expires: process.env.DEFAULT_EXPIRATION,
        default: Date.now,
    }
  },
  {
    collection: 'authNumber',
  }
);

export { AuthNumberSchema };
