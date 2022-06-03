const { Schema } = require('mongoose');

const NoticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: '관리자',
      required: true,
    }
  }, {
    timestamps: true,
    collection: 'notices',
  }
);

export { NoticeSchema };