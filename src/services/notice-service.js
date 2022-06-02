import { noticeModel } from '../db';

class NoticeService {
  // 본 파일의 맨 아래에서, new NoticeService(noticeModel) 하면, 이 함수의 인자로 전달됨
  constructor(noticeModel) {
    this.noticeModel = noticeModel;
  }
  
  // 1. 공지사항 신규 등록
  async addNotice(noticeInfo) {
    const { title, content, author } = noticeInfo;
    
    // 신규 공지 정보 생성 및 db 저장
    const newNoticeInfo = {
      title,
      content,
      author,
    };
    const createdNewNotice = await this.noticeModel.create(newNoticeInfo);
    return createdNewNotice;
  }
  

  // // 2. 전체 공지사항 조회
  // async getNotices() {
  //   const notices = await this.noticeModel.findAll();
  //   return notices;
  // }
  
  
  // 3. 전체 공지사항 갯수 조회
  async countNotices() {
    const noticeQty = await this.noticeModel.countAll();
    return noticeQty;
  }
  

  // 4. 특정 범위(페이지) 위치한 공지사항 정보 조회
  async getRangedNotices(page,perPage) {
    const rangedNoticesInfo = await this.noticeModel.getInRange(page, perPage);
    return rangedNoticesInfo;
  }
  
  
  // 5. 특정 공지사항 조회
  async findNotice(noticeId) {
    const notice = await this.noticeModel.findById(noticeId);
    return notice;
  }
  
  
  // 6. 특정 공지 정보 수정
  async setNotice(noticeId, toUpdate) {
    let notice = await this.noticeModel.findById(noticeId);
    if (!notice) {
      throw new Error('공지 등록 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    notice = await this.noticeModel.update({
      noticeId,
      update: toUpdate,
    });

    return notice;
  }


  // 7. 공지 삭제
  async removeNotice(noticeId) {
    let notice = await this.noticeModel.findById(noticeId);
    
    if (notice) {
      return this.noticeModel.del(noticeId);
    }
    throw new Error('등록되지 않은 공지입니다. 다시 한 번 확인해주세요.');
  }
}

const noticeService = new NoticeService(noticeModel);

export { noticeService };

