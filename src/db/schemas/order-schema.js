import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }),
      required: true
    },
    orderItemQty: { // 제품 종류 가짓수
      type: Number,
      required: true,
    },
    totalQty: { // 총 제품 수 
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    delivered: {
      type : Date,
      required: false,
    },
    paid: {
      type: Date,
      required: false,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: 'orders',
  }
);

export { OrderSchema };