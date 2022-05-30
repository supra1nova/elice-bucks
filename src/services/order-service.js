import { orderModel } from '../db';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  
  // 1. order-schema 생성
  async addOrderList(orderInfo) {
    const { userId : userId } = orderInfo;

    // 주문목록에 사용자가 이미 존재한다면 주문 목록을 합쳐준다.
    let preOrder = await this.orderModel.findById(userId);
    
    if(preOrder) {
      if(paid === createdAt){ // 돈을 아직 안냈다면 주문 목록을 합쳐준다.
        let finalQty = 0;
        let finalPrice = 0;
        let preQty = preOrder.totalQty;
        finalQty = preQty + orderInfo.totalQty;
        let prePrice = preOrder.totalPrice;
        finalPrice = prePrice + orderInfo.totalPrice;

        preOrder.totalQty = finalQty;
        preOrder.totalPrice = finalPrice;

        return preOrder;
      } else{
        const createdNewOrder = await this.orderModel.create(orderInfo);
        return createdNewOrder;
      }
    }
    else{ // 돈을 이미 냈거나, 배송이 시작되었거나, 주문이 취소되었을때에는 주문 목록을 만들어준다
        const createdNewOrder = await this.orderModel.create(orderInfo);
        return createdNewOrder;
    }
  }

  // 2. 주문목록 전체 조회
  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  // 2-1. 전체 주문목록 개수 반환
  async getOrdersNum() {
    const orders = await this.orderModel.findAll();
    const totalorders = orders.length; 
    return totalorders;
  }
  
  // 3. 해당 유저의 주문 물품 목록 조회 ; -> order-items 에서 구현

  // 4. 해당 유저의 주문 목록 반환
  async getUserOrder(userId) {
    const order = await this.orderModel.findById(userId);
    if(order.deletedAt !== order.createdAt) { //deletedAt 이 수정되었다는건 주문이 취소되었음을 의미하므로 
      return null;
    }
    return order;
  }

  // 4-1. 해당 유저의 주문목록 전체 상품개수 반환
  async finalQty(userId) {
    const order = await this.orderModel.findById(userId);
    return order.totalQty;
  }

  // 4-2. 해당 유저의 주문목록 전체 가격 반환
  async finalPrice(userId) {
    const order = await this.orderModel.findById(userId);
    return order.totalPrice;
  }

  // 5-1. 해당 유저의 주문목록 취소처리
  async cancelOrder(orderId) {
    const order = await this.orderModel.findByOrderId(orderId);
    order.deletedAt = new Date();
    return order;
  }

  // 5-2. 해당 유저의 delevered update
  async updateDelivered(orderId) {
    const order = await this.orderModel.findByOrderId(orderId);
    order.delivered = new Date();
    return order;
  }

  // 5-3. 해당 유저의 payment update
  async updatePayment(orderId) {
    const order = await this.orderModel.findByOrderId(orderId);
    order.paid = new Date();
    return order;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
