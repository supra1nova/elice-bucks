import express from 'express';

const ProductSchema = require('../db/schemas/user-schema')

const productRouter = express.Router();


productRouter.get('/', (req, res) => {
    res.send("product");
})

productRouter.get('/list', async(req,res) => {
    const result = await ProductSchema.find({}).exec();
    res.json(result);
})

productRouter.get('/:title', async(req,res) => {
    const title = req.body.title;
    const result = await ProductSchema.find({ title }).exec();
    res.json(result);
})

export { productRouter };