import { Schema } from 'mongoose';

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
    representativeImage: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
      },
    mainImage: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
      },
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };
