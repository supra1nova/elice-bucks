import { Router } from 'express';
import is from '@sindresorhus/is';

// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
// 관리자 페이지에서 로그인한 뒤 들어와야하므로 나중에 분리된 loginRequired 필요...?
import { loginRequired } from '../middlewares';
import { productService } from '../services';


const productRouter = Router();

// 제품등록 - 관리자에 한하여 접근가능하게 추후 변경 필요...?
productRouter.post('register', loginRequired, async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request)의 body 에서 제품 데이터 가져오기
    const { title, price, description, origin } = req.body;
    
    // 가져온 데이터를 제품 db에 추가하기
    const newProduct = await productService.addProduct({
      title,
      price,
      description,
      origin,
    });

    // 추가된 제품의 db 데이터를 프론트에 다시 보내줌
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});


// 전체 제품 목록 조회
productRouter.get('/productlist', async function (req, res, next) {
  try {
    // 전체 제품 목록을 얻음
    const products = await productService.getProducts();

    // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// 제품 정보 수정
// (예를 들어 /api/products/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
productRouter.patch( '/products/:productId', loginRequired, async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }

      // params로부터 id를 가져옴
      const { productId } = req.params;

      // body data 로부터 업데이트할 제품 정보를 추출.
      const { title, price, description, origin } = req.body;

      const productInfoRequired = { productId };

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(title && { title }),
        ...(price && { prcie }),
        ...(description && { description }),
        ...(origin && { origin }),
      };

      // 사용자 정보를 업데이트함.
      const updatedProductInfo = await productService.setProduct(
        productInfoRequired,
        toUpdate
      );

      // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
      res.status(200).json(updatedProductInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { productRouter };
