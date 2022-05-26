import { Router } from 'express';
import is from '@sindresorhus/is';

// 폴더에서 import하면, 자동으로 폴더의 관련파일에서 가져옴
import { orderService } from '../services';
import { OrderSchema } from '../db/schemas/order-schema';

const orderRouter = Router();

// 1. 장바구니에서 주문목록으로 등록
orderRouter.post('/order/move', async (req, res, next) => {
    try{
        if(is.emptyObject(req.body)){
            throw new Error(
                'Error in order/move request'
            );
        }
        const { user_id, address, total_cnt, total_price } = req.body;
        const newOrder = await orderService.addtoOrderList({
            user_id, address, total_cnt, total_price
        })
        res.status(201).json(newProduct);
    } catch (error) {
    next(error);
    }
});

// 2-1. 해당 유저의 주문목록 및 주문 물품 개수 조회
orderRouter.get('/order/:user', async function (req, res, next) {
  try {
    const userId = req.params.user;
    const order = await orderService.getOrder(userId);
    const product_cnt = await orderService.finalCnt(userId);

    // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(order, product_cnt);
  } catch (error) {
    next(error);
  }
});


// 2-2. (admin) 전체 주문목록 조회
orderRouter.get('/order', async function (req, res, next) {
    try {
      const orders = await orderService.getOrders();
      // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  });
// 2-2. (admin) 전체 주문 목록 개수 반환
orderRouter.get('/order/totalNum', async function (req, res, next){
    try {
        const orders_num = await OrderService.getOrdersNum();
        // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(orders_num);
      } catch (error) {
        next(error);
      }
});

// 3. (User) 주문목록에서 제품 취소하기
orderRouter.delete('/order/:orderItemId', async function (req, res, next) {
  try {
    const { orderItemId } = req.params;
    const result = await orderService.cancelOrder(orderItemId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
