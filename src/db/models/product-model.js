import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  // 제품 생성 - 관리자
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  // 제품 전체 조회 - 관리자, 유저
  async findAll() {
    const products = await Product.find({});
    return products;
  }

  // 제품 이름 기준 조회 - 관리자, 유저
  async findByName(name) {
    const product = await Product.findOne({ name });
    return product;
  }
  
  // _id 기준 조회 - 수정할 때 별도로 조회하는데 추가적으로 필요할까... 이미지 연결할 때 ?
  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }

  // 가격 기준 제품 조회 - 관리자, 유저
  async findByPrice(price) {
    const products = await Product.find({ price });
    return products;
  }

  // 카테고리 기준 제품 조회 - 관리자, 유저
  async findByCategory(category) {
    const products = await Product.find({ category });
    return products;
  }

  // 제품 관련 업데이트 - 관리자
  async update({ productName, update }) { 
    const filter = { name: productName };
    const option = { returnOriginal: false };
    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedProduct;
  }

  // 제품 삭제 및 'OK' 반환 - 관리자
  async del( productName ) {
    await Product.deleteOne({ name: productName });  // 이미 service 에서 파일 유무 검증하므로 findOneAndDelete 대신 deletOne 사용 + findOneAndDelete는 return 함
    return 'Successfully deleted';
  }
}

const productModel = new ProductModel();

export { productModel };
