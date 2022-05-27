import { Router } from 'express';
import is from '@sindresorhus/is';

// 폴더에서 import하면, 자동으로 폴더의 관련파일에서 가져옴
import { orderService } from '../services';
import { orderItemService } from '../services/';

const orderRouter = Router();

// 1. 주문목록으로 등록
orderRouter.post('/order', async (req, res, next) => {
    try{
        console.log(10);
        if(is.emptyObject(req.body)){
            throw new Error(
                'Error in order request'
            );
        } 
        const user_id = req.body.user_id;
        const address = req.body.address;
        const total_cnt = req.body.total_cnt;
        const total_price = req.body.total_price;;
        
        const newOrder = await orderService.addtoOrderList({
            user_id, address, total_cnt, total_price
        })
        res.status(201).json(newOrder);
    } catch (error) {
    next(error);
    }
});

// 2-1. 해당 유저의 주문목록 반환
orderRouter.get('/order/:user', async function (req, res, next) {
  try {
    const userId = req.params.user;
    const order = await orderService.getUserOrder(userId);
    const orderId = order[0][_id];
    const items = await orderItemService.getSameOrderID(orderId);

    // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// 2-1-2. 해당 유저의 주문금액 조회
orderRouter.get('/orderprice/:user', async function (req, res, next) {
  try {
    const userId = req.params.user;
    const orderCnt = await orderService.finalPrice(userId);

    // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(orderCnt);
  } catch (error) {
    next(error);
  }
});

// 2-1-3. 해당 유저의 주문물품개수 조회
orderRouter.get('/ordercnt/:user', async function (req, res, next) {
  try {
    const userId = req.params.user;
    const orderCnt = await orderService.finalCnt(userId);

    // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(orderCnt);
  } catch (error) {
    next(error);
  }
});

// 2-2-1. (admin) 전체 주문목록 조회
orderRouter.get('/orderlists', async function (req, res, next) {
    try {
      const orders = await orderService.getOrders();
      // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  });

// 2-2-2. (admin) 전체 주문 목록 개수 반환
orderRouter.get('/numOforderlists', async function (req, res, next){
    try {
        const ordersnum = await orderService.getOrdersNum();
        // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(ordersnum);
      } catch (error) {
        next(error);
      }
});
// 2-2-3. (admin) 제품별 판매 개수 반환
orderRouter.get('/numOforders/:itemId', async function (req, res, next) {
  try{
    const itemId = req.params.itemId;
    const orderNum = await orderItemService.getSameItemId(itemId);
    res.status(200).json(orderNum);
  }catch (error) {
    next(error);
  }
})

// 3. 주문목록 취소 
orderRouter.get('/order/:userId', async function (req, res, next) {
  try {
    const userId = req.params;
    const result = await orderService.cancelOrder(userId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
