import {
  getAllProducts as getAllProductsModel,
  getProductById as getProductByIdModel,
  createProduct as createProductModel,
  updateProduct as updateProductModel,
  deleteProduct as deleteProductModel
} from "../models/product-model.js";

const getAllProducts = async (req, res) => {
  //TODO: needs to be implemented
  res.status(501);
  res.json({error: "Not Implemented"})
}

const getProductById = async (req, res) => {
  //TODO: needs to be implemented
  res.status(501);
  res.json({error: "Not Implemented"})
}

const createProduct = async (req, res) => {
  //TODO: needs to be implemented
  res.status(501);
  res.json({error: "Not Implemented"})
}

const updateProduct = async (req, res) => {
  //TODO: needs to be implemented
  res.status(501);
  res.json({error: "Not Implemented"})
}

const deleteProduct = async (req, res) => {
  //TODO: needs to be implemented
  res.status(501);
  res.json({error: "Not Implemented"})
}

export {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};
