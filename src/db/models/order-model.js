import { model, Types } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';
import { OrderItemSchema } from '../schemas/order-item-schema';

const Order = model('orders', OrderSchema);
const OrderItem = model('order-items', OrderItemSchema);

export class OrderModel {  
  // 주문 목록 만들기
  async create(orderList) {
    const makeNewOrder = await Order.create(orderList);
    return makeNewOrder;
  }

  // 전체 유저의 주문 목록 불러오기
  async findAll() {
    const orderlist = await Order.find({});
    return orderlist;
  }

  // 해당 유저의 주문 목록 불러오기
  async findById(userId) {
    const userOrder = await Order.findOne({ _id: userId });
    return userOrder;
  }

}

export class OrderItemModel {
  // orderItem schema 만들기
  async create(orderItemList) {
    const makeNewOrderItem = await OrderItem.create(orderItemList);
    return makeNewOrderItem;
  }

  // orderItem 전부 불러오기 (전체 유저의 주문목록아이템 불러오기)
  async findAll() {
    const orderitemlist = await OrderItem.find({});
    return orderitemlist;
  }

  // order_id, 지정된 유저의 주문 목록 불러오기
  async findByOrderId(orderId) {
    const orderItem = await OrderItem.findOne({ order_id : orderId });
    return orderItem;
  }
}
const orderModel = new OrderModel();
const orderItemModel = new OrderItemModel();

export { orderModel, orderItemModel };
