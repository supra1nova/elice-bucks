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
    totalQty: { // 총 제품 수 
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    receiverName: {
      type: String,
      required: true
    },
    receiverPhoneNumber: {
      type: Number,
      required: true
    },
    delivered: {
      type : Date,
      required: true,
      default: new Date(0)
    },
    paid: {
      type: Date,
      required: true,
      default: new Date(0)
    },
    deletedAt: {
      type: Date,
      required: true,
      default: new Date(0)
    },
  },
  {
    timestamps: true,
    collection: 'orders',
  }
);

export { OrderSchema };