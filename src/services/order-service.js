import { orderModel } from '../db';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  
  // 1. order-schema 생성
  async addtoOrderList(orderInfo) {
    console.log(orderInfo);
    const { user_id, address, total_cnt, total_price } = orderInfo;
    console.log(user_id);

    // 주문목록에 사용자가 이미 존재한다면 개수를 늘려줌
    const preOrder = await this.orderModel.findbyId(user_id);
    let final_cnt = 0;
    let final_price = 0;

    if(preOrder) {
        let pre_cnt = await preOrder.total_cnt;
        final_cnt = pre_cnt + total_cnt;
        let pre_price = await preOrder.total_price;
        final_price = pre_price + total_price;

        preOrder = await this.orderModel.update({
            user_id,
            update: orderInfo,
        });
        return preOrder;
    }
    else{
        const createdNewOrder = await this.orderModel.create(cart);
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
  
  // 3. 해당 유저의 주문 물품 목록 조회 ; order-items 에서 해야하나 ?


  // 4. 해당 유저의 주문 목록 반환
  async getUserOrder(userId) {
    const order = await this.orderModel.findById(userId);
    // if(order.deleted_at == null) {
    //   return null;
    // } -> deleted_at 구현 한다면
    return order;
  }

  // 4-1. 해당 유저의 주문목록 최종 상품가격 반환 -> 위에서 order.total_price; 해도 되는거 아닌가 ..?
  async finalPrice(userId) {
    const order = await this.orderModel.findById(userId);
    return order.price;
  }

  // 4-2. 해당 유저의 주문목록 전체 상품개수 반환
  async finalCnt(userId) {
    const order = await this.orderModel.findById(userId);
    return order.cnt;
  }

  // 5. 해당 유저의 주문목록 취소처리
  async cancelOrder(userId) {
    const order = await this.orderModel.findById(userId);
    order.deleted_at = new Date();
    return order;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
