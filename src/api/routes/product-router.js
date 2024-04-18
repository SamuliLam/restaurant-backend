import express from "express";

import {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct
} from "../controllers/product-controller.js";

const productRouter = express.Router();
// TODO: Add middlewares
productRouter.route('/')
  .get(getAllProducts)
  .post(postProduct);

// TODO: Add middlewares
productRouter.route('/:id')
  .get(getProductById)
  .put(putProduct)
  .delete(deleteProduct);

export default productRouter;
