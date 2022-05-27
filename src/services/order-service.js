import { Types } from 'mongoose';
import { OrderModel } from '../db';
import { OrderItemModel } from '../db';

// 암호화는 제품에 필요 없을 수도 있으니 일단 주석처리
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

class OrderService {
  constructor(orderModel,orderItemModel) {
    this.orderModel = orderModel;
    this.orderItemModel = orderItemModel;
  }

  // 1. 장바구니에서 주문목록으로 내용 전달
  async addtoOrderList(cart) {
    console.log(cart);
    const { user_id, address, total_cnt, total_price } = cart;
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
            update: cart,
        });
        return preOrder;
    }
    else{
        const createdNewOrder = await this.orderModel.create(cart);
        return createdNewOrder;
    }
  }

  // 1-1. 제품 주문 목록 만들기
  async addOrderItem(orderId, itemId) {
      const newOrderItem = await this.orderItemModel.createItem(orderId, itemId);
      return newOrderItem;
  }

  // 2. 주문목록 전체 조회
  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  // 2-1. 전체 주문목록 개수 반환
  async getOrdersNum() {
    const total_num = await this.orderModel.findAll().count();
    return total_num;
  }

  // 3. 해당 유저의 주문 물품 목록 조회 ; order-items 에서 order_id 동일한 데이터 반환 
  // aggregate 사용 ! 다시 고치기
  async getOrder(userId) {
    const orderId = await this.orderModel.findById(userId)._id;
    const orderItems = await this.orderItemModel.findByOrderId(orderId);
    return orderItems;
  }


  // 4. 해당 유저의 주문 목록 반환 
  async getUserOrder(userId){
    const order = await this.orderModel.findById(userId);
    return order;
  }
  
  // 4-1. 해당 유저의 주문목록 최종 상품가격 반환 -> 위에서 order.total_price; 해도 되는거 아닌가 ..? 
  async finalPrice(userId) {
    const order = await this.orderModel.findById(userId);
    return order.price;
  }

  // 4-2. 해당 유저의 주문목록 전체 상품개수 반환
  async finalCnt(userId){
    const order = await this.orderModel.findById(userId);
    return order.cnt;
  }

  // 5. 주문목록 제품 취소
  async cancelOrder(orderId) {
    let product = await this.orderItemModel.findByName(orderId);
    if (product) {
      return this.orderItemModel.cancelOrder(orderId);
    }
    throw new Error('Error ! 다시 한 번 확인해주세요.');
  }
}

const orderService = new OrderService({OrderModel, OrderItemModel});

export { orderService };
