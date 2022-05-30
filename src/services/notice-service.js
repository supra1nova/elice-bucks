import { noticeModel } from '../db';

class NoticeService {
  // 본 파일의 맨 아래에서, new NoticeService(noticeModel) 하면, 이 함수의 인자로 전달됨
  constructor(noticeModel) {
    this.noticeModel = noticeModel;
  }

  // 1. 신규 공지 등록
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

  // 2. 전 공지 조회
  async getNotices() {
    const notices = await this.noticeModel.findAll();
    return notices;
  }

  // 3. ID 이용 단일 품목 조회
  async findNotice(noticeId) {
    const notice = await this.noticeModel.findById(noticeId);
    return notice;
  }

  // 4. 공지 정보 수정
  async setNotice(noticeId, toUpdate) {
    // 우선 해당 Id의 공지가 db에 있는지 확인
    let notice = await this.noticeModel.findById(noticeId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!notice) {
      throw new Error('공지 등록 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 업데이트 진행
    notice = await this.noticeModel.update({
      noticeId,
      update: toUpdate,
    });

    return notice;
  }

  // 6. 공지 삭제
  async removeNotice(noticeId) {
    // 우선 해당 id의 공지가 db에 있는지 확인
    let notice = await this.noticeModel.findById(noticeId);
    if (notice) {
      return this.noticeModel.del(noticeId);
    }
    throw new Error('등록되지 않은 공지입니다. 다시 한 번 확인해주세요.');
  }
}

const noticeService = new NoticeService(noticeModel);

export { noticeService };

