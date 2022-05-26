import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
      }],
    image: [{
        type: Schema.Types.ObjectId,
        ref: 'Image',
      }],
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };
