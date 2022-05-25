import { model } from 'mongoose';
import { ImageSchema } from '../schemas/image-schema';

const Image = model('images', ImageSchema);

export class ImageModel {
  // 이미지 전체 검색
  async findAll() {
    const images = await Image.find({});
    return images;
  }

  // 이미지 생성
  async create(imageInfo) {
    const createdNewImage = await Image.create(imageInfo);
    return createdNewImage;
  }

  // 이미지삭제
  async del({ imageId }) {
    await Image.deleteOne({ _id: imageId });
    return 'Successfully deleted';
  }
}

const imageModel = new ImageModel();

export { imageModel };
