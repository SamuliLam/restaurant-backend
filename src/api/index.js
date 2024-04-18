import express from 'express';
import productRouter from './routes/product-router.js';
import userRouter from './routes/user-router.js';
const router = express.Router();

//TODO: Add routes here

router.use('/products', productRouter);
router.use('/users', userRouter);

export default router;
