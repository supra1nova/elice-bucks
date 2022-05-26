import { Router } from 'express';
import is from '@sindresorhus/is';

// 폴더에서 import하면, 자동으로 폴더의 관련파일에서 가져옴
import { productService } from '../services';

// admin 확인하기 위한 미들웨어 가져왔는데 오류로 주석처리....
// import { adminRequired } from '../middlewares';

const productRouter = Router();

// 1. 제품등록 - 관리자
productRouter.post('/product/register', async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    console.log(req.body);
    console.log(req.body.name);
    // req (request)의 body 에서 제품 데이터 가져오기
    const { name, price, description } = req.body; // 카테고리, 이미지 변수 일시적 삭제 - populate 된 키값 구현 방법 더 찾아보고 추가 예정

    // 가져온 데이터를 제품 db에 추가하기
    const newProduct = await productService.addProduct({
      // 카테고리, 이미지 키값 일시적 삭제 - populate 된 키값 구현 방법 더 찾아보고 추가 예정
      name,
      price,
      description,
    });

    // 추가된 제품의 db 데이터를 프론트에 다시 보내줌
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// 2. 전체 제품 조회
productRouter.get('/product', async function (req, res, next) {
  try {
    // 전체 제품 목록을 얻음
    const products = await productService.getProducts();

    // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// 3. 단일 품목 조회
productRouter.get('/product/:name', async function (req, res, next) {
  try {
    const { name } = req.params;
    const product = await productService.findProduct(name);

    res.status(200).json(product);

    fs.readFile('', function (error, data) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } catch (error) {
    next(error);
  }
});

// 4. 제품 정보 수정
// (예를 들어 /api/products/abc12345 로 요청하면 req.params.productId는 'abc12345' 문자열로 됨)

// admin 확인하기 위한 미들웨어 삽입 but 오류로 주석 처리
// productRouter.patch( '/products/:productId', adminRequired, async function (req, res, next) {  // admin 확인하깅 한 미들웨어 삽입 but 오류로 주석 처리

productRouter.patch('/product/:productId', async function (req, res, next) {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // params로부터 id를 가져옴
    const productId = req.params.productId;

    // body data 로부터 업데이트할 제품 정보를 추출.
    const { name, price, description, category } = req.body;

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(name && { name }),
      ...(price && { price }),
      ...(description && { description }),
      ...(category && { category }),
    };

    // 제품 정보를 업데이트함.
    const updatedProductInfo = await productService.setProduct(
      productId,
      toUpdate
    );

    // 업데이트 이후의 제품 데이터를 프론트에 보내 줌
    res.status(200).json(updatedProductInfo);
  } catch (error) {
    next(error);
  }
});

// 5. 특정 제품 삭제
productRouter.delete('/product/:productId', async function (req, res, next) {
  try {
    const { productId } = req.params;
    const result = await productService.removeProduct(productId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
