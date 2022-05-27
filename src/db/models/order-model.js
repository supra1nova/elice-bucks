import { model, Types } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';
import { OrderItemSchema } from '../schemas/order-item-schema';

const Order = model('orders', OrderSchema);
const OrderItem = model('order-items', OrderItemSchema);

export class OrderModel {  
  // 주문 목록 만들기 (orders)
  async create(orderList) {
    const makeNewOrder = await Order.create(orderList);
    return makeNewOrder;
  }

  // orders 전체 반환
  async findAll() {
    const orderlist = await Order.find({});
    return orderlist;
  }

  // orders 에서 해당 유저 값 찾기
  async findById(userId) {
    const userOrder = await Order.findOne({ _id:
      new Types.ObjectId(userId) });
    return userOrder;
  }

  // 이미 존재하는 user라면 update
  async update({userId, update}) {
    const filter = { userId : new Types.ObjectId(userId) };
    const option = { returnOriginal: false };
    const updatedOrders = await Order.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedOrders;
  }
}

export class OrderItemModel {
  // 주문 제품 목록 만들기 (order-items)
  async create_items(orderId, itemId) {
    const newItem = await OrderItem.create(orderId, itemId);
    return newItem;
  }

  // orderItem 전부 불러오기 (전체 유저의 주문목록아이템 불러오기)
  async findAll() {
    const orderitemlist = await OrderItem.find({});
    return orderitemlist;
  }

  // order_id, 지정된 유저의 주문 목록 불러오기
  async findByOrderId(orderId) {
    const orderItem = await OrderItem.findOne({ order_id : 
      new Types.ObjectId(orderId) });
    return orderItem;
  }

  // item_id, 지정된 제품의 주문 목록 불러오기
  async findByItemId(itemId){
    const orderItems = await OrderItem.findAll({
      item_id : new Types.ObjectId(itemId)
    });
    return orderItems;
  }

  // 주문 목록에서 취소하기 
  async cancelOrder(orderId) {
    const orderItem = await OrderItem.findOne({ order_id : new Types.ObjectId(orderId)});
    
    await OrderItem.deleteOne(orderItem);
    return 'Successfully canceled order';
  }
}


const orderModel = new OrderModel();
const orderItemModel = new OrderItemModel();

export { orderModel, orderItemModel };
