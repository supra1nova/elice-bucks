import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  // 제품 전체 검색
  async findAll() {
    const products = await Product.find({});
    return products;
  }

  // 제품명에 따른 검색 (여러 값 반환 가능)
  async findByTitle(title) {
    const product = await Product.find({ title });
    return product;
  }

  // 제품 가격에 따른 검색 (여러 값 반환 가능)
  async findByPrice(price) {
    const products = await Product.findOne({ price });
    return products;
  }

  // 제품 원산지에 따른 검색 (여러 값 반환 가능)
  async findByOrigin(origin) {
    const products = await Product.find({ origin });
    return products;
  }

  // 제품 생성
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  // 제품 관련 업데이트
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

  // 제품 삭제 및 'OK' 반환...? 
  async del({ productId }) {
    await Product.deleteOne({ _id: productId });
    return 'Successfully deleted';
  }
}

const productModel = new ProductModel();

export { productModel };
