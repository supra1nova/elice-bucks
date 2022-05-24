import { Schema } from 'mongoose';

const MainImageSchema = new Schema(
  {
    type: String,
    data: Buffer,
  },
  {
    collection: 'mainImages',
  }
);

export { MainImageSchema };
