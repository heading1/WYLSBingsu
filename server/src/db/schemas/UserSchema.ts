import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: new Schema(
        {
          kakao: String,
          github: String,
          google: String,
        },
        { _id: false }
      ),
      required: false,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export { UserSchema };
