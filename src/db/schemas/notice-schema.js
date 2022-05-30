const { Schema } = require('mongoose');
// const shortId = require('./types/short-id');

const NoticeSchema = new Schema(
  {
    // shortId,
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