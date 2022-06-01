import { Schema } from 'mongoose';
const product  = new Schema({
  productId :{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    require: true
  },
  productQty: Number,
  productPrice: Number
});

const OrderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    productsId: [product]
  },
  {
    timestamps: true,
    collection: 'orderitems',
  }
);

export { OrderItemSchema };