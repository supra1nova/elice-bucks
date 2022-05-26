import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  // 1. 카테고리 목록 조회
  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  // 2. 카테고리 id 기준 조회
  async findById(categoryId) {
    const category = await Category.findOne({ _id: categoryId });
    return category;
  }

  // 3. 카테고리 이름 기준 조회
  async findByCategory(categoryName) {
    const category = await Category.findOne({ name: categoryName });
    return category;
  }

  // 4. 카테고리 생성
  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  // 5. 카테고리 수정
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

  // 6. 카테고리 삭제
  async del(categoryId) {
    await Category.deleteOne({ _id: categoryId });
    return 'Successfully deleted';
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
