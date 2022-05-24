import { Schema } from 'mongoose';

const ImageSchema = new Schema({
  width: Number,
  height: Number,
});

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    image : ImageSchema,
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };
