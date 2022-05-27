import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('Product', ProductSchema);

export class ProductModel {
  // 1. 제품 생성
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  // 2. 제품 전체 조회
  async findAll() {
    const products = await Product.find({}).populate('category', 'name');
    return products;
  }

  // 3. _id 기준 조회
  async findById(productId) {
    
    // product 스키마의 _id를 이용해 조회한 뒤, populate를 통해 'category'로 등록된 ref를 찾아 name 값을 가져옴
    const product = await Product.findOne({ _id: productId }).populate(
      'category',
      'name'
    );
    return product;
  }

  // 4. 카테고리 기준 제품 조회
  async findByCategory(categoryId) {

    // product 스키마의 categoryId를 이용해 조회한 뒤, 'category'로 등록된 ref를 찾아 name 값을 가져옴
    const products = await Product.find({ category: categoryId }).populate(
      'category',
      'name'
    );
    return products;
  }

  // 5. 제품 이름 기준 조회
  async findByName(name) {
    const product = await Product.findOne({ name });
    return product;
  }

  // // 5. 가격 기준 제품 조회
  // async findByPrice(price) {
  //   const products = await Product.find({ price });
  //   return products;
  // }

  // 7. 제품 관련 업데이트
  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };
    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProduct;
  }

  // 8. 제품 삭제 및 'OK' 반환
  async del(productId) {
    await Product.deleteOne({ _id: productId }); // 이미 service 에서 파일 유무 검증하므로 findOneAndDelete 대신 deletOne 사용 + findOneAndDelete는 return 함
    return 'Successfully deleted';
  }
}

const productModel = new ProductModel();

export { productModel };
