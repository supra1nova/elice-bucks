import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  // 카테고리 전체 검색
  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  // 카테고리 생성
  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  // 카테고리 삭제
  async del({ categoryId }) {
    await Category.deleteOne({ _id: categoryId });
    return 'Successfully deleted';
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
