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
    mainImage: [{
        type: Schema.Types.ObjectId,
        ref: 'MainImage',
      }],
    subImage: [{
        type: Schema.Types.ObjectId,
        ref: 'SubImage',
      }],
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };
