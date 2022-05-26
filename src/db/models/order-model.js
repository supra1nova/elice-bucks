import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {  
  async create(orderList) {
    const makeNewOrder = await Order.create(orderList);
    return makeNewOrder;
  }

  async findAll() {
    const orderlist = await Order.find({});
    return orderlist;
  }

  // async update({ userId, update }) {
  //   const filter = { _id: userId };
  //   const option = { returnOriginal: false };

  //   const updatedList= await User.findOneAndUpdate(filter, update, option);
  //   return updatedList;
  // }
}
const orderModel = new OrderModel();

export { orderModel };
