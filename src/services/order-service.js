import { orderModel } from '../db';
const isSameDateAndTime = (date1, date2) => {
  return date1.getTime() === date2.getTime();
};
class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 1. order-schema 생성
  async addOrderList(orderInfo) {
    // 주문목록에 사용자가 이미 존재한다면 주문 목록을 합쳐준다. -> 생각해보니까 주문 목록을 합쳐주는일은 없을듯 ..! 주문을 완료 안했으면 다시 장바구니로 돌아가야지 주문목록이 update 될 일은 없을듯
    const createdNewOrder = await this.orderModel.create(orderInfo);
    return createdNewOrder;
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

  // 2-2. 전체 주문 총액 반환
  async getOrdersPrice() {
    const orders = await this.orderModel.findAll({});
    let price = 0;
    for (let i = 0; i < orders.length; i++) {
      price = price + orders[i].totalPrice;
    }
    return price;
  }

  // 3. 해당 유저의 주문 물품 목록 조회 ; -> order-items 에서 구현

  // 4. 해당 유저의 주문 목록 반환
  async getUserOrder(userId) {
    const order = await this.orderModel.findById(userId);
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
    let order = await this.orderModel.findByOrderId(orderId);
    order.deletedAt = new Date();
    const cancelOrder = await this.orderModel.update(order);
    return cancelOrder;
  }

  // 5-2. 해당 유저의 delivered update
  async updateDelivered(orderId) {
    const order = await this.orderModel.findByOrderId(orderId);
    order.delivered = new Date();
    const delivered = await this.orderModel.update(order);
    return delivered;
  }

  // 5-3. 해당 유저의 payment update
  async updatePayment(orderId) {
    let order = await this.orderModel.findByOrderId(orderId);
    order.paid = new Date();
    const paid = await this.orderModel.update(order);
    return paid;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
