import { model, Types } from 'mongoose';
import { OrderItemSchema } from '../schemas/order-item-schema';

const OrderItem = model('OrderItem', OrderItemSchema);

export class OrderItemModel {

    // 1. 주문 제품 목록 만들기 (order-items)
    async createItems(orderInfo) {
      const newItem = await OrderItem.create(orderInfo);
      return newItem;
    }
  
    // 2. order-items 전부 불러오기 (전체 유저의 주문목록아이템 불러오기)
    async findAll() {
      const orderItemlist = await OrderItem.find({}).populate('orderId').populate({path: 'productsId', populate:{path:'productId'}});
      return orderItemlist;
    }
  
    // 3. 특정 주문 목록의 물품 내역 불러오기
    async findByOrderId(orderId) {
      const orderItem = await OrderItem.find({ orderId : new Types.ObjectId(orderId) }).populate({path: 'productsId', populate:{path:'productId'}});
      return orderItem;
    }
  
    // 4. 특정 제품의 주문 목록 불러오기
    async findByProductId(productId){
      const orderItems = await OrderItem.find({ productId : new Types.ObjectId(productId) }).populate({path: 'productsId', populate:{path:'productId'}});
      return orderItems;
    }
  }

  const orderItemModel = new OrderItemModel();

  export { orderItemModel };
