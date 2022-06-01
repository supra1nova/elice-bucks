import { Router } from 'express';
import is from '@sindresorhus/is';

// 폴더에서 import하면, 자동으로 폴더의 관련파일에서 가져옴
import { noticeService } from '../services';

const noticeRouter = Router();

// 1. 공지사항 등록
noticeRouter.post('/register', async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { title, content, author } = req.body;

    // 가져온 데이터를 공지사항 db에 추가하기
    const newNotice = await noticeService.addNotice({
      title,
      content,
      author,
    });

    // 추가된 제품의 db 데이터를 프론트에 다시 보내줌
    res.status(201).json(newNotice);
  } catch (error) {
    next(error);
  }
});


// 2. 전체 공지사항 조회 및 페이지네이션 관련 정보 전달
noticeRouter.get('/notices', async function (req, res, next) {
  try {
    // url 쿼리에서 page 받기, 기본값 1
    const page = Number(req.query.page) || 1;
    
    // url 쿼리에서 perRage 받기, 기본값 10
    const perPage = Number(req.query.perPage) || 10;
    
    // total(전체 공지사항 글 갯수), posts(현재 페이지에 있는 공지사항 글 정보) 를 Promise.all 을 사용해 동시에 호출
    const [total, posts] = await Promise.all([
      await noticeService.countNotices(),
      await noticeService.getRangedNotices(page, perPage)
    ]);
    
    const totalPage = Math.ceil(total / perPage);
    
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
// (예를 들어 /api/notices/abc12345 로 요청하면 req.params.noticeId 는 'abc12345' 문자열로 됨)
noticeRouter.patch('/:noticeId', async function (req, res, next) {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // params로부터 id를 가져옴
    const noticeId = req.params.noticeId;
    
    // body data 로부터 업데이트할 공지사항 정보를 추출.
    const { title, content, author } = req.body;

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(title && { title }),
      ...(content && { content }),
      ...(author && { author }),
    };

    // 공지사항 정보를 업데이트함.
    const updatedNoticeInfo = await noticeService.setNotice(
      noticeId,
      toUpdate
    );

    // 업데이트 이후의 공지사항 데이터를 프론트에 보내 줌
    res.status(200).json(updatedNoticeInfo);
  } catch (error) {
    next(error);
  }
});

// 6. 특정 공지사항 삭제
noticeRouter.delete('/:noticeId', async function (req, res, next) {
  try {
    const { noticeId } = req.params;
    const result = await noticeService.removeNotice(noticeId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { noticeRouter };







//   // 기존 전체 공지사항 조회 - 필요 없을시 향후 삭제 예정
// noticeRouter.get('/notices', async function (req, res, next) {
  
//   try {
//     // 전체 공지사항 목록을 얻음
//     const notices = await noticeService.getNotices();
    
//     // 공지사항 목록(배열)을 JSON 형태로 프론트에 보냄
//     res.status(200).json(notices);
//   } catch (error) {
//     next(error);
//   }
// });