import { Router } from 'express';
import { productService } from '../services';
import { loginRequired, adminRequired } from '../middlewares'

import is from '@sindresorhus/is';
import fs from 'fs';
import multer from 'multer';


const productRouter = Router();


// 1. 제품등록
productRouter.post('/register', loginRequired, adminRequired, async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { name, price, description, category, image } = req.body;
    const newProduct = await productService.addProduct({ name, price, description, category, image });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});


// 2. 페이지네이션 된 제품 리스트 조회 - 페이지네이션 적용
productRouter.get('/products', async function (req, res, next) {
  try {

    // url 쿼리로부터 page 값 수신, 부재시 기본값 1
    const page = Number(req.query.page) || 1;

    // url 쿼리로부터 perRage 값 수신, 부재시 기본값 12
    const perPage = Number(req.query.perPage) || 12;
    
    // total(전체 제품수), posts(현재 페이지에 있는 제품 정보) 를 Promise.all 을 사용해 동시에 호출
    const [total, posts] = await Promise.all([
      await productService.countProducts(),
      await productService.getRangedProducts(page, perPage)
    ]);
    
    const totalPage = Math.ceil(total / perPage);
    
    // 제품 목록(배열), 현재 페이지, 전체 페이지 수, 전체 제품 수량 등 을 json 형태로 프론트에 전달
    res.status(200).json({ posts, page, perPage, totalPage, total });
  } catch (error) {
    next(error);
  }
});


// 3. 제품 Id 이용 단일 품목 조회
productRouter.get('/:productId', async function (req, res, next) {
  try {
    const { productId } = req.params;
    const product = await productService.findProduct(productId);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});


// 4. categoryId 이용 단일 품목 조회
productRouter.get(
  '/category/:categoryId',
  async function (req, res, next) {
    try {
      const { categoryId } = req.params;
      const product = await productService.findByCategoryId(categoryId);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);


// 5. 제품 정보 수정
productRouter.patch('/:productId', loginRequired, adminRequired, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req.params 으로부터 productId 추출
    const productId = req.params.productId;

    // req.body 로부터 업데이트할 제품 정보 추출
    const { name, price, description, category, image, stock } = req.body;

    // 업데이트할 제품정보가 있다면, 업데이트용 객체에 삽입
    const toUpdate = {
      ...(name && { name }),
      ...(price && { price }),
      ...(description && { description }),
      ...(category && { category }),
      ...(image && { image }),
      ...(stock && { stock }),
    };

    // 제품 정보 업데이트
    const updatedProductInfo = await productService.setProduct(
      productId,
      toUpdate
    );

    // 업데이트된 제품 데이터를 프론트에 json 형태로 전달
    res.status(200).json(updatedProductInfo);
  } catch (error) {
    next(error);
  }
});


// 6. 특정 제품 삭제
productRouter.delete('/:productId', loginRequired, adminRequired, async function (req, res, next) {
  try {
    const { productId } = req.params;
    const result = await productService.removeProduct(productId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});


//** 멀터 정의 내용
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpg" || 
  file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/gif" || file.mimetype === "image/webp"){
    cb(null, true);
  } else {
    req.fileValidationError = "jpg, jpeg, png, gif, webp 파일만 업로드 가능합니다.";
    cb(null, false);
  }
}

const upload = multer({
  storage: multer.diskStorage({
    
    //폴더위치 지정
    destination: (req, file, done) => {
      done(null, 'src/views/images/');
    },

    //파일명칭 설정
    filename: (req, file, done) => {
      done(null, `${Date.now()}.jpg`);
    },
  }),
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});


// 7. 멀터 이용 이미지 삽입
productRouter.post('/image', loginRequired, adminRequired, upload.single("image"), (req, res, next) => {
  try {
    res.status(200).send({ image: `/images/${req.file.filename}` });
  } catch (error) {
    next(error.message + '이미지를 넣을 수 없습니다.');
  }
});


// 8. fs 이용 이미지 삭제(하드 삭제)
productRouter.delete('/image/:image', loginRequired, adminRequired, async (req, res, next) => {

const image = req.params.image;
const path = 'src/views/images/';

try {
  fs.unlinkSync(path + image);
  res.status(200).send('이미지가 성공적으로 삭제되었습니다.');
} catch (error) {
  error.message = '이미지가 서버에 존재하지 않습니다.';
  next(error);
}
})

export { productRouter };