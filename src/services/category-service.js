import { categoryModel } from '../db';

class CategoryService {
  // 본 파일의 맨 아래에서, new CategoryService(categoryModel) 하면, 이 함수의 인자로 전달됨
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }


  // 1. 신규 카테고리 등록
  async addCategory(categoryInfo) {
    const name = categoryInfo;

    // 카테고리명 중복 확인
    const categoryList = (await (this.getCategories())).map(category => category.name);
    const result = categoryList.includes(name)
    if (result) {
      throw new Error(
        '이 카테고리 명칭은 현재 사용중입니다. 다른 명칭을 입력해 주세요.'
      );
    }

    // 신규 카테고리 정보 생성 및 db 저장
    const newCategoryInfo = { name };
    const createdNewCategory = await this.categoryModel.create(newCategoryInfo);

    return createdNewCategory;
  }


  // 2. 전체 카테고리 조회
  async getCategories() {
    const categories = await this.categoryModel.findAll();
    return categories;
  }


    // 3. ID 이용 단일 카테고리 조회
  async findCategory(categoryId) {
    const category = await this.categoryModel.findById(categoryId);
    return category;
  }


  // 4. 카테고리 정보 수정
  async setCategory(categoryId, toUpdate) {
    const result = await this.categoryModel.update(categoryId, toUpdate );
    if (result) {
      return result;
    }
    throw new Error( '카테고리 등록 내역이 없습니다. 다시 한 번 확인해 주세요.' );
  }


  // // 5. 카테고리 삭제
  // async removeCategory(categoryId) {
  //   const result = await this.categoryModel.del(categoryId);
  //   if (result) {
  //     return result;
  //   }
  //   throw new Error('삭제할 수 없습니다. 등록되지 않은 카테고리입니다. 다시 한 번 확인해주세요.');
  // }

  // 5. 카테고리 삭제 수정
  async removeCategory(categoryId) {
    const category = await this.categoryModel.findById(categoryId);
    if (category) {
      return this.categoryModel.del(categoryId);
    }
    throw new Error('삭제할 수 없습니다. 등록되지 않은 카테고리입니다. 다시 한 번 확인해주세요.');
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
