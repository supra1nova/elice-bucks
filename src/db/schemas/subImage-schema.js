import { Schema } from 'mongoose';

const SubImageSchema = new Schema(
  {
    type: String,
    data: Buffer,
  },
  {
    collection: 'subImages',
  }
);

export { SubImageSchema };
