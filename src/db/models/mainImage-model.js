import { model } from 'mongoose';
import { MainImageSchema } from '../schemas/mainImage-schema';

const MainImage = model('mainImages', MainImageSchema);

export class MainImageModel {
  // 이미지 전체 검색
  async findAll() {
    const mainImages = await MainImage.find({});
    return mainImages;
  }

  // 이미지 생성
  async create(mainImageInfo) {
    const createdNewMainImage = await MainImage.create(mainImageInfo);
    return createdNewMainImage;
  }

  // 카테고리 삭제
  async del({ mainImageId }) {
    await MainImage.deleteOne({ _id: mainImageId });
    return 'Successfully deleted';
  }
}

const mainImageModel = new MainImageModel();

export { mainImageModel };
