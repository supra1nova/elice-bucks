import { Router } from 'express';
import { noticeService } from '../services';
import { loginRequired, adminRequired } from '../middlewares';

import is from '@sindresorhus/is';

const noticeRouter = Router();

// 1. 공지사항 등록
noticeRouter.post('/register', loginRequired, adminRequired, async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { title, content, author } = req.body;
    const newNotice = await noticeService.addNotice({ title, content, author });

    res.status(201).json(newNotice);
  } catch (error) {
    next(error);
  }
});


// 2. 페이지네이션 된 공지사항 조회 및 페이지네이션 관련 정보 전달
noticeRouter.get('/notices', async function (req, res, next) {
  try {
    
    // url 쿼리로부터 page 값 수신, 부재시 기본값 1
    const page = Number(req.query.page) || 1;
    
    // url 쿼리로부터 perRage 값 수신, 부재시 기본값 12
    const perPage = Number(req.query.perPage) || 10;
    
    // total(전체 공지사항 갯수), posts(현재 페이지에 있는 공지사항 정보) 를 Promise.all 을 사용해 동시에 호출
    const [total, posts] = await Promise.all([
      await noticeService.countNotices(),
      await noticeService.getRangedNotices(page, perPage)
    ]);
    
    const totalPage = Math.ceil(total / perPage);
    
    // 공지사항 목록(배열), 현재 페이지, 전체 페이지 수, 전체 공지사항 갯수 등 을 json 형태로 프론트에 전달
    res.status(200).json( { posts, page, perPage, totalPage, total } );
  } catch (error) {
    next(error);
  }
});
  

// 3. 공지사항 id이용 특정 공지 조회
noticeRouter.get('/:noticeId', async function (req, res, next) {
  try {
    const { noticeId } = req.params;
    const notice = await noticeService.findNotice(noticeId);

    res.status(200).json(notice);
  } catch (error) {
    next(error);
  }
});

// 5. 공지사항 정보 수정
noticeRouter.patch('/:noticeId', loginRequired, adminRequired, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req.params 으로부터 noticeId 추출
    const noticeId = req.params.noticeId;
    
    // req.body 로부터 업데이트 공지사항 정보 추출
    const { title, content, author } = req.body;

    // 업데이트할 공지 정보가 있다면, 업데이트용 객체에 삽입
    const toUpdate = {
      ...(title && { title }),
      ...(content && { content }),
      ...(author && { author }),
    };

    // 공지사항 정보 업데이트
    const updatedNoticeInfo = await noticeService.setNotice(
      noticeId,
      toUpdate
    );

    // 업데이트된 공지사항 데이터를 프론트 json형태로 전달
    res.status(200).json(updatedNoticeInfo);
  } catch (error) {
    next(error);
  }
});

// 6. 특정 공지사항 삭제
noticeRouter.delete('/:noticeId', loginRequired, adminRequired, async function (req, res, next) {
  try {
    const { noticeId } = req.params;
    const result = await noticeService.removeNotice(noticeId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { noticeRouter };