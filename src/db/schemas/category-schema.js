import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    
    name: {
      type: String,
      required: true,
      unique: true,
    },
    product: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }],
  },
);

export { CategorySchema };
