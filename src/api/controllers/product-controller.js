import {
  getAllProducts as getAllProductsModel,
  getProductById as getProductByIdModel,
  createProduct as createProductModel,
  updateProduct as updateProductModel,
  deleteProduct as deleteProductModel
} from "../models/product-model.js";

const getAllProducts = async (req, res) => {
  res.json(await getAllProductsModel());
}

const getProductById = async (req, res) => {
  const id = req.params.id;
  res.json(await getProductByIdModel(id));
}

const postProduct = async (req, res) => {
  const result = await createProductModel(req.body, res.local.user);
  if (result.product_id){
    res.status(201);
    res.json({message: 'New product added.', result});
  } else {
    res.status(400);
    res.json({error: "Bad Request"});
  }
}

const putProduct = async (req, res) => {
  const result = await updateProductModel(req.body, req.params.id, res.locals.user);
  if (!result){
    res.status(400);
    res.json({error: "Bad Request"});
  }
  res.json(result);
}

const deleteProduct = async (req, res) => {
  const result = await deleteProductModel(req.params.id, res.locals.user);
  if (!result){
    res.status(400);
    res.json({error: "Bad Request"});
  }
  res.json(result);
}

export {getAllProducts, getProductById, postProduct, putProduct, deleteProduct};
