import { Schema } from 'mongoose';

const OrderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    productId: { //여기서 price / name 가져오기
      type: Schema.Types.ObjectId,
      ref: 'Product',
      require: true
    },
    productQty: {
      type: Number,
      require: true,
      default: 1
    },
    totalPrice: {
      type: Number,
      require: true,
      default: 0
    }
  },
  {
    timestamps: true,
    collection: 'orderitems',
  }
);

export { OrderItemSchema };