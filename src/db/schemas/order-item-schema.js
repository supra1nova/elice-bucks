import { Schema } from 'mongoose';

const OrderItemSchema = new Schema(
  {
    item_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_id: {
        type: Number,
        ref: 'Product',
        require: true,
    }
  },
  {
    timestamps: true,
  }
);

export { OrderItemSchema };