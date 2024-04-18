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
  const result = await createProductModel(req.body);
  if (result.product_id){
    res.status(201);
    res.json({message: 'New product added.', result});
  } else {
    res.status(400);
    res.json({error: "Bad Request"});
  }
}

const putProduct = async (req, res) => {
  //TODO: needs to be implemented
  res.status(501);
  res.json({error: "Not Implemented"})
}

const deleteProduct = async (req, res) => {
  //TODO: needs to be implemented
  res.status(501);
  res.json({error: "Not Implemented"})
}

export {getAllProducts, getProductById, postProduct, putProduct, deleteProduct};
