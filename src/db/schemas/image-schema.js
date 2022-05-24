import { Schema } from 'mongoose';

const ImageSchema = new Schema(
  {
    type: String,
    data: Buffer,
  },
  {
    collection: 'images',
  }
);

export { ImageSchema };
