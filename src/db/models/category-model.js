import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('Category', CategorySchema);

export class CategoryModel {

  // 1. 카테고리 생성
  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }
  
  
  // 2. 카테고리 전체 목록 조회
  async findAll() {
    const categories = await Category.find({});
    return categories;
  }
  
  
  // 3. 특정 카테고리 조회 - _id 이용
  async findById(categoryId) {
    const category = await Category.findOne({ _id: categoryId });
    return category;
  }
  
  
  // 4. 전체 카테고리의 명칭 추출 - aggregate 사용
  async getCategoryNames() {
    const categoryNameList = await Category.aggregate([{ $project: { name: 1, _id: 0 } }]);
    const result = categoryNameList.map(key => key.name);
    return result;
  }

  // 5. 카테고리 수정
  async update(categoryId, update) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };
    const updatedCategory = await Category.findOneAndUpdate( filter, update, option );
    return updatedCategory;
  }


  // 6. 카테고리 삭제 수정
  async del(categoryId) {
    await Category.deleteOne({ _id: categoryId }); // 
    return 'Successfully deleted';
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
