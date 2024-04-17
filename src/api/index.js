import express from 'express';
import productRouter from './routes/product-router.js';
const router = express.Router();

//TODO: Add routes here

router.use('/products', productRouter);

export default router;
