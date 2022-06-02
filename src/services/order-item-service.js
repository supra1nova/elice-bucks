import { orderItemModel } from '../db';

class OrderItemService {
  constructor(orderItemModel) {
    this.orderItemModel = orderItemModel;
  }
 
  // 1. order item schema 구현 
  async addOrderItemList(orderInfo) {
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
    const products = await this.orderItemModel.findQtyByProductId(productId);
    console.log('******',products);
    const productsNum = products.productId;
    console.log('***------***',productsNum);
    return productsNum;
  }

  async getAllProducts() {
    const products = await this.orderItemModel.findAll();
    return products;
  }

  // 2-3-1. (pagination) order 개수 반환
  async countOrders() {
    const orderItemsQty = await this.orderItemModel.countAll();
    return orderItemsQty;
  }

  // 2-3-2. (pagination) 특정 페이지에 위치한 order정보 조회
  async getRangedOrders(page, perPage) {
    const rangedOrderItemsInfo = await this.orderItemModel.getInRange(page, perPage);
    return rangedOrderItemsInfo;
  }
}

const orderItemService = new OrderItemService( orderItemModel );

export { orderItemService };
