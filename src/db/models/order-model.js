import { model, Types } from 'mongoose';
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
    const orders = await Order.find({}).populate('userId');

    return orders;
  }

  // orders 에서 해당 유저 값 찾기
  async findById(userId) {
    const userOrder = await Order.findOne({ userId : userId}).populate('userId');
    return userOrder;
  }

  // 여기서의 orderId 는 order schema 에서의 _id 를 의미
  async findByOrderId(orderId) { 
    const order = await Order.findOne({ orderId : orderId});
    return order;
  }

  //  
  async update(toUpdate) {
    const filter = { _id: toUpdate._id };
    const option = { returnOriginal: false };
    const updatedOrders = await Order.findOneAndUpdate(
      filter,
      toUpdate,
      option,
    );
    return updatedOrders;
  }
}

const orderModel = new OrderModel();

export { orderModel };
