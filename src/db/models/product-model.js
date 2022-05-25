import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  // 제품 생성 - 관리자
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  // 제품 전체 검색 - 관리자, 유저
  async findAll() {
    const products = await Product.find({});
    return products;
  }

  // 제품 이름 기준 조회 - 관리자, 유저
  async findByTitle(title) {
    const product = await Product.find({ title });
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

  // 카테고리 기준 조회 - 관리자, 유저
  async findByOrigin(category) {
    const products = await Product.find({ category });
    return products;
  }

  // 제품 관련 업데이트 - 관리자
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

  // 제품 삭제 및 'OK' 반환 - 관리자
  async del({ productId }) {
    await Product.deleteOne({ _id: productId });
    return 'Successfully deleted';
  }
}

const productModel = new ProductModel();

export { productModel };
