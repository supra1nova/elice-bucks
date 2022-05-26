import { productModel } from '../db';

// 암호화는 제품에 필요 
class ProductService {
  // 본 파일의 맨 아래에서, new ProductService(productModel) 하면, 이 함수의 인자로 전달됨
  constructor(productModel) {
    this.productModel = productModel;
  }

  // 1. 신규 제품 등록
  async addProduct(productInfo) {
    const { name, price, description } = productInfo; // 카테고리, 이미지 매개변수 일시적 삭제 - populate 된 키값 구현 방법 더 찾아보고 추가 예정

    // 제품명 중복 확인
    const product = await this.productModel.findByName(name);
    if (product) {
      throw new Error(
        '이 제품명은 현재 사용중입니다. 다른 제품명을 입력해 주세요.'
      );
    }

    // 신규 제품 정보 생성 및 db 저장
    const newProductInfo = { name, price, description }; // 카테고리, 이미지 매개변수 일시적 삭제 - populate 된 키값 구현 방법 더 찾아보고 추가 예정

    const createdNewProduct = await this.productModel.create(newProductInfo);

    return createdNewProduct;
  }

  // 2. 전 제품 조회
  async getProducts() {
    const products = await this.productModel.findAll();
    return products;
  }

  // 3. 단일 품목 조회
  async findProduct(name) {
    const product = await this.productModel.findByName(name);
    return product;
  }

  // 4. 제품 정보 수정
  async setProduct(productName, toUpdate) {
    // 우선 해당 명칭의 제품이 db에 있는지 확인
    let product = await this.productModel.findByName(productName);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error('제품 등록 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 업데이트 진행
    product = await this.productModel.update({
      productName,
      update: toUpdate,
    });

    return product;
  }

  // 5. 제품 삭제
  async removeProduct(productName) {
    // 우선 해당 id의 제품이 db에 있는지 확인
    let product = await this.productModel.findByName(productName);
    if (product) {
      return this.productModel.del(productName);
    }
    throw new Error('등록되지 않은 제품입니다. 다시 한 번 확인해주세요.');
  }
}

const productService = new ProductService(productModel);

export { productService };
