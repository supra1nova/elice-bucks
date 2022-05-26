import { Schema } from 'mongoose';

const ImageSchema = new Schema(
  {
    type: String,
    // data: Buffer,
    // 이게 맞는건지...?
    imageURL: {
      type: [String],
      default:
        'https://image.shutterstock.com/image-vector/no-image-available-icon-flat-600w-1240855801.jpg',
      index: true,
    },
  },
  {
    collection: 'images',
  }
);

export { ImageSchema };
