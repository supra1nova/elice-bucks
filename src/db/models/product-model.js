import { product } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = product('products', ProductSchema);

export class ProductModel {
  // 제품id에 따른 검색
  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }
  
  // 제품명에 따른 검색
  async findByTitle(title) {
    const product = await Product.find({ title });
    return product;
  }
  
  // 제품 전체 검색
  async findAll() {
    const products = await Product.find({});
    return products;
  }

  // 제품 생성
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  // 제품 관련 업데이트?? 어떤걸 업데이트할지에 따라 수정/추가 필요
  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(filter, update, option);
    return updatedProduct;
  }
}

const productModel = new ProductModel();

export { productModel };
