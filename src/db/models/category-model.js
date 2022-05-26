import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  // 카테고리 목록 조회
  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  // 카테고리 이름 기준 조회 - 관리자, 유저
  async findByCategory(categoryName) {
    const category = await Category.findOne({ name: categoryName });
    return category;
  }

  // 카테고리 생성
  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  // 카테고리 수정
  async update({ categoryName, update }) {
    const filter = { name: categoryName };
    const option = { returnOriginal: false };
    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCategory;
  }

  // 카테고리 삭제
  async del({ categoryName }) {
    await Category.deleteOne({ name: categoryName });
    return 'Successfully deleted';
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
