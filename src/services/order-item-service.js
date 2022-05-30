import { orderItemModel } from '../db';

class OrderItemService {
  constructor(orderItemModel) {
    this.orderItemModel = orderItemModel;
  }
 
  // 1. order item schema 구현 
  async addOrderItemList(orderInfo) {
    console.log(orderInfo);
    const newOrderItem = await this.orderItemModel.createItems(orderInfo);
    return newOrderItem;
  }

  // 2-1. 해당 유저의 주문 목록 반환
  async getSameOrderId(orderId){
      const items = await this.orderItemModel.findByOrderId(orderId);
      return items;
  }

  // 2-2. 제품별 목록개수 반환
  async getSameProductId(productId) {
    const totalNum = await this.orderItemsModel.findByProductId(productId).count();
    return totalNum;
  }

}

const orderItemService = new OrderItemService( orderItemModel );

export { orderItemService };
