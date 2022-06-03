import { productModel } from '../db';
import { categoryModel } from '../db';
import fs from 'fs';

class ProductService {
  // 본 파일의 맨 아래에서, new ProductService(productModel) 하면, 이 함수의 인자로 전달됨
  constructor(productModel) {
    this.productModel = productModel;
  }
  
  // 1. 신규 제품 등록 - 주의!! postman에서 테스트시, 수동으로 카테고리 생성 후 _id와 name 입력 필요
  //  프론트에서 카테고리 아이디와 이름을 별도로 전달해주고 있으므로!!
  async addProduct(productInfo) {
    const { name, price, category, description, image, stock } = productInfo;
    const { _id: categoryId, name: categoryName  } = category;
    
    // 제품명 중복 확인
    const product = await this.productModel.findByName(name);
    if (product) {
      throw new Error(
        '이 제품명은 현재 사용중입니다. 다른 제품명을 입력해 주세요.'
        );
      }
      
    // 카테고리명 이용 조회 후 신규 카테고리일 경우 자동 생성
    const categoryList = await categoryModel.getCategoryNames();
    if (!categoryList.includes(categoryName)) {
      const newCategoryModel = await categoryModel.create({
        name: categoryName,
      });
      categoryId = newCategoryModel._id.toString();
    }
    
    // 신규 제품 정보 생성 및 db 저장
    const newProductInfo = {
      name,
      price,
      description,
      category: categoryId,
      image,
      stock,
    };
    const createdNewProduct = await this.productModel.create(newProductInfo);
    return createdNewProduct;
  }
  
  
  // 2. 제품 전체 조회 - 페이지네이션에서 이미 조회를 다 하고 있는데 과연 필요 있을지...? -> /zinger/ 제가 씁니다..!
  async getProducts() {
    const products = await this.productModel.findAll();
    return products;
  }
  

  // 3. 전체 제품 품목 수(SKU) 조회
  async countProducts() {
    const productQty = await this.productModel.countAll();
    return productQty;
  }


  // 4. 특정 범위(페이지) 위치한 제품 정보 조회
  async getRangedProducts(page,perPage) {
    const rangedProductsInfo = await this.productModel.getInRange(page, perPage);
    return rangedProductsInfo;
  }


  // 5. ID 이용 단일 품목 조회
  async findProduct(productId) {
    const product = await this.productModel.findById(productId);
    return product;
  }


  // 6. 카테고리 아이디별 검색
  async findByCategoryId(categoryId) {
    const product = await this.productModel.findByCategory(categoryId);
    return product;
  }


  // 7. 제품 정보 수정
  async setProduct(productId, toUpdate) {
    // 우선 해당 명칭의 제품이 db에 있는지 확인
    let product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error('제품 등록 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 카테고리명을 이용해 조회, 신규 카테고리일 경우 자동으로 생성
    const categoryName = toUpdate.category;
    let categoryId = '';

    const categoryList = await categoryModel.getCategoryNames();

    if (categoryList.includes(categoryName)) {
      const index = categoryList.indexOf(categoryName);
      categoryId = (await categoryModel.findAll({})).map((result) =>
        result._id.toString()
      )[index];
    } else if (categoryName) {
      const newCategoryModel = await categoryModel.create({
        name: categoryName,
      });
      categoryId = newCategoryModel._id.toString();
    }

    toUpdate.category = categoryId;

    // 업데이트 진행
    product = await this.productModel.update({
      productId,
      update: toUpdate,
    });

    return product;
  }


  // 8. 제품 삭제
  async removeProduct(productId) {
    // 우선 해당 id의 제품이 db에 있는지 확인
    let product = await this.productModel.findById(productId);
    if (product) {

      // 제품 정보에서 이미지 이름을 가져온다.
      const image = product.image;
      const path = 'src/views';
      
      // 이미지 파일이 존재하는지 확인 후 삭제
      if (fs.existsSync(path + image)) {
        fs.unlinkSync(path + image);
      }

      // 제품 삭제
      return this.productModel.del(productId);
    }
    throw new Error('등록되지 않은 제품입니다. 다시 한 번 확인해주세요.');
  }
}

const productService = new ProductService(productModel);

export { productService };
