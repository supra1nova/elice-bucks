import { model, Types } from 'mongoose';
import { OrderItemSchema } from '../schemas/order-item-schema';

const OrderItem = model('OrderItem', OrderItemSchema);

export class OrderItemModel {

    // 1. 주문 제품 목록 만들기 (order-items)
    async create_items(orderInfo) {
      const newItem = await OrderItem.create(orderInfo);
      return newItem;
    }
  
    // 2. order-items 전부 불러오기 (전체 유저의 주문목록아이템 불러오기)
    async findAll() {
      const orderitemlist = await OrderItem.find({}).populate(
        'name',
        'price',
        'category' 
      );
      return orderitemlist;
    }
  
    // order_id, 지정된 유저의 주문 목록 불러오기
    async findByOrderId(orderId) {
      const orderItem = await OrderItem.find({ order_id : 
        new Types.ObjectId(orderId) }).populate(
          'name',
          'price',
          'category',
          'image' // front 쪽에서 item 관련 어떤 정보가 필요할지 모르겠음 
        );
      return orderItem;
    }
  
    // item_id, 지정된 제품의 주문 목록 불러오기
    async findByItemId(itemId){
      const orderItems = await OrderItem.find({
        item_id : new Types.ObjectId(itemId)
      }).populate(
        'name',
        'price',
        'category',
        'image' // front 쪽에서 item 관련 어떤 정보가 필요할지 모르겠음 
      );
      return orderItems;
    }
  }

  const orderItemModel = new OrderItemModel();

  export { orderItemModel };
