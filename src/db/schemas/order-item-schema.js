import { Schema } from 'mongoose';

const OrderItemSchema = new Schema(
  {
    item_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    order_id: {
        type: Number,
        ref: 'products',
        require: true,
    }
  },
  {
    collection: 'order-items',
    timestamps: true,
  }
);

export { OrderItemSchema };