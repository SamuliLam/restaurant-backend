import express from "express";

import {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct
} from "../controllers/product-controller.js";
import {authenticateToken} from "../../middlewares.js";

const productRouter = express.Router();
// TODO: Add middlewares
productRouter.route('/')
  .get(getAllProducts)
  .post(authenticateToken, postProduct, );

// TODO: Add middlewares
productRouter.route('/:id')
  .get(getProductById)
  .post(authenticateToken, putProduct)
  .delete(authenticateToken, deleteProduct);


export default productRouter;
