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
    image: {
        type: String,
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }]
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };
