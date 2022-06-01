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

  // 이미 존재하는 user라면 update -> service 에서 addOrderList method 에 구현 해둬서 딱히 쓸일이 없을것 같음.
  async update({orderId, update}) {
    const filter = { _id: new Types.ObjectId(orderId) };
    const option = { returnOriginal: false };
    console.log('update : ', update);
    const updatedOrders = await Order.findOneAndUpdate(
      filter,
      update,
      option,
    );
    console.log('updatedOrders : ', updatedOrders);
    return updatedOrders;
  }
}

const orderModel = new OrderModel();

export { orderModel };
