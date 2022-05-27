import { orderItemModel } from '../db';

class OrderItemService {
  constructor(orderItemModel) {
    this.orderItemModel = orderItemModel;
  }
 
  // 1. order item schema 구현 -> model 에 있는거랑 너무 똑같은데 굳이 만들어야하나요 
  async addtoOrderitemList(orderInfo) {
    console.log(orderInfo);
    const newOrderItem = await this.orderItemModel.create_items(orderInfo);
    return newOrderItem;

  }

  // 2-1. order_id 가 동일한 items 반환 = 해당 유저의 주문 목록 반환
  async getSameOrderId(orderId){
      const items = await this.orderItemModel.findByOrderId(orderId).populate('name', 'price');
      return items;
  }

  // 2-2. 제품별 목록개수 반환
  async getSameItemId(itemId) {
    const items_total_num = await this.orderItemsModel.findByItemId(itemId).count();
    return items_total_num;
  }

}

const orderItemService = new OrderItemService( orderItemModel );

export { orderItemService };
