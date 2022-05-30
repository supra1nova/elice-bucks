import { Router } from 'express';
import is from '@sindresorhus/is';

// 폴더에서 import하면, 자동으로 폴더의 관련파일에서 가져옴
import { loginRequired } from '../middlewares';
import { orderService } from '../services';
import { orderItemService } from '../services/';

const orderRouter = Router();

// 1. 주문목록으로 등록
orderRouter.post('/user/register', loginRequired, async (req, res, next) => {
    try{
      if(is.emptyObject(req.body)){
          throw new Error(
              'Error in order request'
          );
      } 
      const cart = req.body;

      const { userId, address, orderItemQty, totalQty, totalPrice } = cart;
      const newOrder = await orderService.addOrderList({ userId, address, orderItemQty, totalQty, totalPrice });

      const orderId = newOrder._id;
      for (let i = 0; i < newOrder.orderItemQty; i++) {
        const { productId, productQty, productPrice } = cart;
        const newOrderItem = await orderItemService.addOrderItemList({ orderId, productId, productQty, productPrice });
        console.log(newOrderItem);
      }
      
      res.status(201).json(newOrder);
    } catch (error) {
    next(error);
    }
});

//-> orderItems 등록하는 router 따로 구현 
orderRouter.post('/items', async (req, res, next) => { 
  try{
    if(is.emptyObject(req.body)){
      throw new Error(
          'Error in order request'
      );
  } 
    const cart = req.body;
    const { orderId, productId, productQty, productPrice } = cart;
    const newOrderItem = await orderItemService.addOrderItemList({ orderId, productId, productQty, productPrice });
    console.log(newOrderItem);
    res.status(201).json(newOrderItem);
  }catch (error) {
    next( error );
  }
})

// 2-1. 해당 유저의 주문목록 반환
orderRouter.get('/user/:userId', async function (req, res, next) {
  try {
    const { userId } = req.params;
    const order = await orderService.getUserOrder(userId);
    const orderId = order._id;
    const products = await orderItemService.getSameOrderId(orderId);
    console.log(products);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// 2-1-2. 해당 유저의 주문금액 조회
orderRouter.get('/user/price/:userId', async function (req, res, next) {
  try {
    const { userId } = req.params;
    const finalPrice = await orderService.finalPrice(userId);

    res.status(200).json(finalPrice);
  } catch (error) {
    next(error);
  }
});

// 2-1-3. 해당 유저의 주문물품개수 조회
orderRouter.get('/user/qty/:userId', async function (req, res, next) {
  try {
    const { userId } = req.params;
    const orderCnt = await orderService.finalQty(userId);

    // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(orderCnt);
  } catch (error) {
    next(error);
  }
});

// 2-2-1. (admin) 전체 주문목록 조회
orderRouter.get('/admin/orders', async function (req, res, next) {
    try {
      const orders = await orderService.getOrders();
      // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  });

// 2-2-2. (admin) 전체 주문 목록 개수 반환
orderRouter.get('/admin/qty', async function (req, res, next){
    try {
        const ordersnum = await orderService.getOrdersNum();
        // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(ordersnum);
      } catch (error) {
        next(error);
      }
});
// 2-2-3. (admin) 제품별 판매 개수 반환
orderRouter.get('/admin/qty/:productId', async function (req, res, next) {
  try{
    const { productId } = req.params;
    const orderNum = await orderItemService.getSameProductId(productId);
    res.status(200).json(orderNum);
  }catch (error) {
    next(error);
  }
})

// 3. 주문목록 취소 (admin 과 user 모두 사용 가능)
orderRouter.get('/cancel/:orderId', async function (req, res, next) {
  try {
    const { orderId } = req.params;
    const result = await orderService.cancelOrder(orderId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
