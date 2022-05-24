import { model } from 'mongoose';
import { SubImageSchema } from '../schemas/subImage-schema';

const SubImage = model('subImages', SubImageSchema);

export class SubImageModel {
  // 이미지 전체 검색
  async findAll() {
    const subImages = await SubImage.find({});
    return subImages;
  }

  // 이미지 생성
  async create(subImageInfo) {
    const createdNewSubImage = await SubImage.create(subImageInfo);
    return createdNewSubImage;
  }

  // 카테고리 삭제
  async del({ subImageId }) {
    await SubImage.deleteOne({ _id: subImageId });
    return 'Successfully deleted';
  }
}

const subImageModel = new SubImageModel();

export { subImageModel };
