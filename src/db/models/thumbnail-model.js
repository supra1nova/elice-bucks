import { model } from 'mongoose';
import { ThumbnailSchema } from '../schemas/thumbnail-schema';

const Thumbnail = model('thumbnails', ThumbnailSchema);

export class ThumbnailModel {
  // 이미지 전체 검색
  async findAll() {
    const thumbnails = await Thumbnail.find({});
    return thumbnails;
  }

  // 이미지 생성
  async create(thumbnailInfo) {
    const createdNewThumbnail = await Thumbnail.create(thumbnailInfo);
    return createdNewThumbnail;
  }

  // 카테고리 삭제
  async del({ thumbImageId }) {
    await Thumbnail.deleteOne({ _id: thumbImageId });
    return 'Successfully deleted';
  }
}

const thumbnailModel = new ThumbnailModel();

export { thumbnailModel };
