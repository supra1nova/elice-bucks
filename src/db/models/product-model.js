import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('Product', ProductSchema);

export class ProductModel {
  
  // 1. 제품 생성
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }
    
    
  // 2. 제품 전체 조회 - 페이지네이션에서 이미 조회를 다 하고 있는데 과연 필요 있을지...?
  async findAll() {
    const products = await Product.find({}).populate('category', 'name').sort({ "createdAt": -1 });
    return products;
  }
  

  //  3. 전체 제품 품목 수(SKU) 조회
  async countAll() {
    const productSKU = await Product.countDocuments({});
    return productSKU;
  }


  //  4. 특정 범위(페이지) 위치한 제품 정보 조회
  async getInRange(page, perPage) {
    // url 쿼리에서 page 받기, 기본값 1
    const productsInRange = await Product.find({}).populate('category', 'name').sort({ createdAt: -1 }).skip(perPage * (page - 1)).limit(perPage);
    return productsInRange;
  }


  // 5. _id 기준 조회 - product 스키마의 _id를 이용해 조회한 뒤, populate를 통해 'category'로 등록된 ref를 찾아 name 값을 가져옴
  async findById(productId) {
    const product = await Product.findOne({ _id: productId }).populate( 'category', 'name' );
    return product;
  }


  // 6. 카테고리 기준 제품 조회 - product 스키마의 categoryId를 이용해 조회한 뒤, 'category'로 등록된 ref를 찾아 name 값을 가져옴
  async findByCategory(categoryId) {
    const products = await Product.find({ category: categoryId }).populate( 'category', 'name' );
    return products;
  }


  // 7. 제품 이름 기준 조회
  async findByName(name) {
    const product = await Product.findOne({ name });
    return product;
  }

  
  // 8. 제품 관련 수정
  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };
    const updatedProduct = await Product.findOneAndUpdate( filter, update, option );
    return updatedProduct;
  }

  
  // 9. 제품 삭제 및 'OK' 반환 - 이미 service 에서 파일 유무 검증하므로 findOneAndDelete 대신 deletOne 사용 + findOneAndDelete는 return 함
  async del(productId) {
    const deletedProduct = await Product.deleteOne({ _id: productId });
    return deletedProduct;
  }
}

const productModel = new ProductModel();

export { productModel };

  
  
  
  
  
  
  
  

  // // 6. 가격 기준 제품 조회
  // async findByPrice(price) {
  //   const products = await Product.find({ price });
  //   return products;
  // }