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
    const orderItemlist = await OrderItem
            .find({})
            .sort({createdAt: -1})            
            .populate('orderId')
            .populate({
              path: 'products', 
              populate:{
                path:'productId'
              }
            });
    return orderItemlist;
  }

  // 3. 특정 주문 목록의 물품 내역 불러오기
  async findByOrderId(orderId) {
    const orderItem = await OrderItem
            .find({ orderId : new Types.ObjectId(orderId) })
            .populate('orderId')
            .populate({
              path: 'products', 
              populate:{
                path:'productId'
              }
            }).exec();
    return orderItem;
  }

  // 4. 특정 제품의 productQty 불러오기
  async findByProductId(myproductId){
    const orderItems = await OrderItem.find({});
    let foundId;
    let foundQty = 0;
    for(let i = 0; i < orderItems.length; i++){
      for (let j =0; j < orderItems[i].products.length; j++){
        foundId = orderItems[i].products[j].productId;
        if(foundId.equals(new Types.ObjectId(myproductId))){
          foundQty += parseInt(orderItems[i].products[j].productQty);
        }
      }
    }
    return foundQty;
  }

  // 5-1. 전체 order 조회
  async countAll() {
    const countOrderItems = await OrderItem.countDocuments({});
    return countOrderItems;
  }

  // 5-2. 특정 페이지에 위치한 제품 정보 조회
  async getInRange(page, perPage) {
    const orderItemsInRange = await OrderItem.find({}).sort({createdAt: -1}).populate('orderId').populate({path: 'products', populate:{path:'productId'}}).skip(perPage * (page - 1)).limit(perPage);
    return orderItemsInRange;
  }
}

const orderItemModel = new OrderItemModel();

export { orderItemModel };