import { Router } from 'express';
import is from '@sindresorhus/is';

// 폴더에서 import하면, 자동으로 폴더의 관련파일에서 가져옴
import { categoryService } from '../services';



const categoryRouter = Router();

// 1. 카테고리 등록 - 관리자
categoryRouter.post('/register', async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request)의 body 에서 카테고리 데이터 가져오기
    const { name } = req.body; 

    // 가져온 데이터를 카테고리 db에 추가하기
    const newCategory = await categoryService.addCategory( name );

    // 추가된 카테고리 db 데이터를 프론트에 다시 보내줌
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});


// 2. 전체 카테고리 조회
categoryRouter.get('/', async function (req, res, next) {
  try {
    // 전체 카테고리 목록을 얻음
    const categories = await categoryService.getCategories();

    // 카테고리 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});


// 3. 카테고리 Id 이용 단일 카테고리 조회
categoryRouter.get('/:categoryId', async function (req, res, next) {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.findCategory(categoryId);
    
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});


// 4. 카테고리 정보 수정
// (예를 들어 /api/categories/abc12345 로 요청하면 req.params.categoryName은 'abc12345' 문자열로 됨)
categoryRouter.patch( '/:categoryId', async function (req, res, next) {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // params로부터 id를 가져옴
    const categoryId = req.params.categoryId;

    // body data 로부터 업데이트할 카테고리 정보를 추출.
    const { name } = req.body;

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(name && { name })
    };
    
    // 카테고리 정보를 업데이트함.
    const updatedCategoryInfo = await categoryService.setCategory(
      categoryId,
      toUpdate
    );

      // 업데이트 이후의 카테고리 데이터를 프론트에 보내 줌
      res.status(200).json(updatedCategoryInfo);
    } catch (error) {
      next(error);
    }
});


// 5. 특정 카테고리 삭제
categoryRouter.delete('/:categoryId', async function (req, res, next) {
  try {
    const { categoryId } = req.params;
    const result = await categoryService.removeCategory(categoryId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
