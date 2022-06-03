import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('Order', OrderSchema);

export class OrderModel {
  // 주문 목록 만들기 (orders)
  async create(orderList) {
    const makeNewOrder = await Order.create(orderList);
    return makeNewOrder;
  }

  // orders 전체 반환
  async findAll() {
    const orders = await Order.find({}).sort({ "createdAt": -1 }).populate('userId');
    return orders;
  }

  // orders 에서 해당 유저 값 찾기
  async findById(userId) {
    const userOrder = await Order.find({ userId: userId }).sort({ "createdAt": -1 }).populate('userId');
    return userOrder;
  }

  // 여기서의 orderId 는 order schema 에서의 _id 를 의미
  async findByOrderId(orderId) {
    const order = await Order.sort({ "createdAt": -1 }).find({ _id: orderId });
    return order;
  }

  //  order update
  async update(toUpdate) {
    const filter = { _id: toUpdate[0]._id };
    const option = { returnOriginal: false };
    const updatedOrders = await Order.findOneAndUpdate(
      filter,
      toUpdate[0],
      option
    );
    return updatedOrders;
  }
}

const orderModel = new OrderModel();

export { orderModel };
