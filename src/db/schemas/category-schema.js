import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,  // 필수 여부 확인 필요
      unique: true,
    },
  },
  {
    collection: 'categories',
  }
);

export { CategorySchema };
