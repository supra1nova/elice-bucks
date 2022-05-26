import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        ref: 'Product',
        require: true,
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
    cnt: {
        type: Number,
        required: true
    },
    product_title: {
        type: String,
        required: true
    }
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
