import { model } from 'mongoose';
import { NoticeSchema } from '../schemas/notice-schema';

const Notice = model('Notice', NoticeSchema);

export class NoticeModel {
  
  // 1. 공지사항 생성
  async create(noticeInfo) {
    const createdNewNotice = await Notice.create(noticeInfo);
    return createdNewNotice;
  }
  

  // 2. 전체 공지사항 숫자 조회
  async countAll() {
    const noticeQty = await Notice.countDocuments({});
    return noticeQty;
  }


  // 3. 특정 범위(페이지) 위치한 공지사항 정보 조회
  async getInRange(page, perPage) {
    // url 쿼리에서 page 받기, 기본값 1
    const noticesInPage = await Notice.find({}).sort({ createdAt: -1 }).skip(perPage * (page - 1)).limit(perPage);
    return noticesInPage;
  }
  

  // 4. 특정 공지사항 조회 - _id 기준 조회
  async findById(noticeId) {
    const notice = await Notice.findOne({ _id: noticeId });
    return notice;
  }


  // 5. 특정 공지사항 수정
  async update({ noticeId, update }) {
    const filter = { _id: noticeId };
    const option = { returnOriginal: false };
    const updatedNotice = await Notice.findOneAndUpdate( filter, update, option );
    return updatedNotice;
  }


  // 6. 공지사항 삭제 및 'OK' 반환 - 이미 service 에서 파일 유무 검증하므로 findOneAndDelete 대신 deletOne 사용 + findOneAndDelete는 return 함
  async del(noticeId) {
    const deletedNotice = await Notice.deleteOne({ _id: noticeId });
    return deletedNotice;
  }
}

const noticeModel = new NoticeModel();

export { noticeModel };
