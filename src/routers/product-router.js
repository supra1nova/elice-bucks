import { Router } from 'express';
import is from '@sindresorhus/is';
import multer from 'multer';
import fs from 'fs';
import { loginRequired, adminRequired } from '../middlewares'

// 폴더에서 import하면, 자동으로 폴더의 관련파일에서 가져옴
import { productService } from '../services';

const productRouter = Router();

// 1. 제품등록
// productRouter.post('/register', loginRequired, adminRequired, async (req, res, next) => {
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

    // 가져온 데이터를 제품 db에 추가하기
    const newProduct = await productService.addProduct({
      name,
      price,
      description,
      category,
      image,
    });

    // 추가된 제품의 db 데이터를 프론트에 다시 보내줌
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});


// 2. 전체 제품 조회 - 페이지네이션 적용
productRouter.get('/products', async function (req, res, next) {
  try {

    // url 쿼리에서 page 받기, 기본값 1
    const page = Number(req.query.page) || 1;

    // url 쿼리에서 perRage 받기, 기본값 12
    const perPage = Number(req.query.perPage) || 12;
    
    // total(전체 제품수), posts(현재 페이지에 있는 제품 정보) 를 Promise.all 을 사용해 동시에 호출
    const [total, posts] = await Promise.all([
      await productService.countProducts(),
      await productService.getRangedProducts(page, perPage)
    ]);
    
    const totalPage = Math.ceil(total / perPage);
    
    // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
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
// (예를 들어 /api/products/abc12345 로 요청하면 req.params.productId는 'abc12345' 문자열로 됨)
productRouter.patch('/:productId', loginRequired, adminRequired, async function (req, res, next) {
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
    const { name, price, description, category, image, stock } = req.body;

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(name && { name }),
      ...(price && { price }),
      ...(description && { description }),
      ...(category && { category }),
      ...(image && { image }),
      ...(stock && { stock }),
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
// 참고 https://wayhome25.github.io/nodejs/2017/02/21/nodejs-15-file-upload/
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/gif" || file.mimetype === "image/webp"){
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
productRouter.post('/imageUpload', loginRequired, adminRequired, upload.single("image"), (req, res, next) => {
// productRouter.post('/image', upload.single("image"), (req, res, next) => {
  try {
    res.status(200).send({ image: `/images/${req.file.filename}` });
  } catch (error) {
    next(error.message + '이미지를 넣을 수 없습니다.');
  }
});


// 8. fs 이용 이미지 삭제(하드 삭제)
productRouter.delete('/imageUpload/:image', loginRequired, adminRequired, async (req, res, next) => {
// productRouter.delete('/image/:image', async (req, res, next) => {

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

  
  
  
  
  

  
// !!!!!!!! 추후 안정화 이후 삭제 예정   

  
  
  
  
// // 기존 전체 제품 조회
// productRouter.get('/products', async function (req, res, next) {
//   try {
//     // 전체 제품 목록을 얻음
//     const products = await productService.getProducts();

//     // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
//     res.status(200).json(products);
//   } catch (error) {
//     next(error);
//   }
// });

  
  
  
// // 멀터 관련 업로드 기능
// const upload = multer({
//   storage: multer.diskStorage({
//     //폴더위치 지정
//     destination: (req, file, done) => {
//       done(null, 'src/views/images/');
//     },
//     filename: (req, file, done) => {
//       // const ext = path.extname(file.originalname);
//       // aaa.txt => aaa+&&+129371271654.txt
//       // const fileName = path.basename(file.originalname, ext) + Date.now() + ext;
//       done(null, `${Date.now()}.jpg`);
//     },
//   }),
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });
  
  
