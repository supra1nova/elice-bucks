import { Router } from 'express';
import { categoryService } from '../services';
import { loginRequired, adminRequired } from '../middlewares'

import is from '@sindresorhus/is';

const categoryRouter = Router();


// 1. 신규 카테고리 등록
categoryRouter.post('/register', loginRequired, adminRequired, async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }
    const { name } = req.body; 
    const newCategory = await categoryService.addCategory( name );

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});


// 2. 전체 카테고리 조회
categoryRouter.get('/categories', async function (req, res, next) {
  try {
    const categories = await categoryService.getCategories();

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
categoryRouter.patch( '/:categoryId', loginRequired, adminRequired, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req.params 으로부터 categoryId 추출
    const categoryId = req.params.categoryId;

    // req.body 로부터 업데이트할 카테고리 정보 추출.
    const { name } = req.body;

    // 업데이트할 카테고리 정보가 있다면, 업데이트용 객체에 삽입
    const toUpdate = {
      ...(name && { name })
    };
    
    // 카테고리 정보 업데이트
    const updatedCategoryInfo = await categoryService.setCategory(
      categoryId,
      toUpdate
    );

  // 업데이트된 카테고리 데이터를 프론트 json형태로 전달
  res.status(200).json(updatedCategoryInfo);
  } catch (error) {
    next(error);
  }
});


// 5. 특정 카테고리 삭제
categoryRouter.delete('/:categoryId', loginRequired, adminRequired, async function (req, res, next) {
  try {
    const { categoryId } = req.params;
    const result = await categoryService.removeCategory(categoryId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
