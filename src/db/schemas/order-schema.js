import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
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
    total_cnt: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    }
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };