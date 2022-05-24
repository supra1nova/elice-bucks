import { Schema } from 'mongoose';

const ThumbnailSchema = new Schema(
  {
    type: String,
    data: Buffer,
  },
  {
    collection: 'thumbnails',
  }
);

export { ThumbnailSchema };
