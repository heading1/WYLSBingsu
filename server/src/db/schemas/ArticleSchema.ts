import { Schema } from 'mongoose';

const ArticleSchema = new Schema(
  {
    uniqueNumber: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    toppingImage: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'articles',
    timestamps: true,
  }
);

export { ArticleSchema };
