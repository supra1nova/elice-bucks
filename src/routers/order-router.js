import { Router } from 'express';
import is from '@sindresorhus/is';

// 폴더에서 import하면, 자동으로 폴더의 관련파일에서 가져옴
import { loginRequired } from '../middlewares';
import { adminRequired } from '../middlewares';
import { orderService } from '../services';
import { orderItemService } from '../services/';
import { productService } from '../services/';

const orderRouter = Router();

// test) register orderitems
orderRouter.post('/orderitem', async (req, res, next) => {
  try {
    const orderItem = req.body;
    const newOrderItem = await orderItemService.addOrderItemList(orderItem);

    res.status(201).json(newOrderItem);
  } catch (err) {
    next(err);
  }
});
// test) register order
orderRouter.post('/order', async (req, res, next) => {
  try {
    const order = req.body;
    const newOrder = await orderService.addOrderList(order);

    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

// 1. 주문목록으로 등록
orderRouter.post('/user/register', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('Error in order request');
    }
    const cart = req.body;
    const userId = req.currentUserId;
    const { address, totalQty, totalPrice, receiverName,
      receiverPhoneNumber, products } = cart;
    const newOrder = await orderService.addOrderList({
      userId,
      address,
      totalQty,
      totalPrice,
      receiverName,
      receiverPhoneNumber,
    });
    const orderId = newOrder._id;
    const newOrderItem = await orderItemService.addOrderItemList({
      orderId,
      products,
    });
    const newOrderInfo = { newOrder, newOrderItem };
    res.status(201).json(newOrderInfo); // newOrder 과 newOrderItem 을 같이 불러옴
  } catch (error) {
    next(error);
  }
});

// 2-1. 해당 유저의 주문목록 반환 
orderRouter.get('/user/orders', loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const order = await orderService.getUserOrder(userId);
    let products = [];
    console.log(order.length);
    for (let i = 0; i< order.length; i++) {
      let orderId = order[i]._id;
      let product = await orderItemService.getSameOrderId(orderId);
      products.push(product);
    }
    
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// 2-1-2. 해당 유저의 주문금액 조회
orderRouter.get('/user/price', loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const finalPrice = await orderService.finalPrice(userId);

    res.status(200).json(finalPrice);
  } catch (error) {
    next(error);
  }
});

// 2-1-3. 해당 유저의 주문물품개수 조회
orderRouter.get('/user/qty', loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const orderCnt = await orderService.finalQty(userId);

    // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(orderCnt);
  } catch (error) {
    next(error);
  }
});
// 2-2-1-1. (admin) 전체 주문목록 조회(pagination)
orderRouter.get('/admin/orders/pagination', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const [total, posts] = await Promise.all([
      await orderItemService.countOrders(),
      await orderItemService.getRangedOrders(page, perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);

    res.status(200).json({ posts, page, perPage, totalPage, total });
  } catch (error) {
    next(error);
  }
});

// 2-2-1. (admin) 전체 주문목록 조회
orderRouter.get(
  '/admin/orders',
  loginRequired,
  adminRequired,
  async function (req, res, next) {
    try {
      const products = await orderItemService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

// 2-2-2. (admin) 전체 주문 목록 개수 반환
orderRouter.get(
  '/admin/qty',
  loginRequired,
  adminRequired,
  async function (req, res, next) {
    try {
      const ordersnum = await orderService.getOrdersNum();
      res.status(200).json(ordersnum);
    } catch (error) {
      next(error);
    }
  }
);

// 2-2-3. (admin) 각각의 제품별 판매 개수 반환 --> 왜안됨 ..?
orderRouter.get(
  '/admin/productsQty', loginRequired, adminRequired, async function (req, res, next) {
    try {
      const allProducts = await productService.getProducts();
      let Products = [];
      let setProduct = [];
      for (let i = 0; i < allProducts.length; i++) {
        const product = allProducts[i]._id;
        const orderProduct = await orderItemService.getSameProductId(product);
        setProduct.push(product);
        setProduct.push(orderProduct);
        Products.push(setProduct);
        setProduct = [];
      }
      
      res.status(200).json(Products);
    } catch (error) {
      next(error);
    }
  }
);

// 2-2-3-1. product 한개 주문 목록 조회 (2-2-3을 위한 test)
orderRouter.get(
  '/productsQty/:productId', async function (req, res, next) {
    try {
      const productId = req.params.productId;
      const products = await orderItemService.getSameProductId(productId);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

// 2-2-4. (admin) 총 주문 금액 반환
orderRouter.get(
  '/admin/price',
  loginRequired,
  adminRequired,
  async function (req, res, next) {
    try {
      const total = await orderService.getOrdersPrice();
      res.status(200).json(total);
    } catch (error) {
      next(error);
    }
  }
);

// 3. 주문목록 취소 (admin 과 user 모두 사용 가능)
orderRouter.patch('/cancel/:orderId', async function (req, res, next) {
  try {
    const { orderId } = req.params;
    const result = await orderService.cancelOrder(orderId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// 4. 배송 시작
orderRouter.patch('/delivered/:orderId', async function (req, res, next) {
  try {
    const { orderId } = req.params;
    const result = await orderService.updateDelivered(orderId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// 5. 결제 완료
orderRouter.patch('/paid/:orderId', async function (req, res, next) {
  try {
    const { orderId } = req.params;
    const result = await orderService.updatePayment(orderId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
export { orderRouter };
