import express from 'express';
import productRouter from './routes/product-router.js';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
const router = express.Router();

//TODO: Add routes here

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);



export default router;
