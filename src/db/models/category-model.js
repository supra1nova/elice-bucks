import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('Category', CategorySchema);

export class CategoryModel {
  // 1. 카테고리 생성
  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }
  
  // 2. 카테고리 목록 조회
  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  // 3. 카테고리 수정
  async update({ categoryId, update }) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };
    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCategory;
  }

  // 4. 카테고리 삭제
  async del(categoryId) {
    await Category.deleteOne({ _id: categoryId });
    return 'Successfully deleted';
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
