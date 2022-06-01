import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // 기본 이미지를 image 폴더에 넣고 그 이미지를 호출하는 방식으로 하면 어떨까?
      default : '-',
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
      required: true,
    },
    
    // 각 제품은 하나의 카테고리를 가져야하므로 배열 형태가 아니도록 설정
    category: {
      type: Schema.Types.ObjectId,
      
      //  카테고리 ref값은 model(첫번째인자, 두번째인자) 의 첫번째인자 값과 동일하게 작성
      ref: 'Category',
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'products',
  }
);

export { ProductSchema };
