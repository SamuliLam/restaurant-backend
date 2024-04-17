import express from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product-controller.js";

const productRouter = express.Router();
// TODO: Add middlewares
productRouter.route('/')
  .get(getAllProducts)
  .post(createProduct);

// TODO: Add middlewares
productRouter.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default productRouter;
