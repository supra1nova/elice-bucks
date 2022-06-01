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
      const products = await this.orderItemModel.findByOrderId(orderId);
      return products;
  }

  // 2-2. 제품별 목록개수 반환
  async getSameProductId(productId) {
    const products = await this.orderItemModel.findByProductId(productId);
    const productsNum = products.length;
    return productsNum;
  }

  async getAllProducts() {
    const products = await this.orderItemModel.findAll();
    return products;
  }
}

const orderItemService = new OrderItemService( orderItemModel );

export { orderItemService };
