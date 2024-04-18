import promisePool from "../../utils/database.js";

const getAllProducts = async () => {
  const [rows] = await promisePool.query("SELECT * FROM Products");
  console.log(rows);
}

const getProductById = async (id) => {
  const [rows] = await promisePool.query("SELECT * FROM Products WHERE ProductID = ?", [id]);
  console.log(rows);
}

const createProduct = async (product) => {
  //TODO: needs to be implemented
}

const updateProduct = async (id, product) => {
  //TODO: needs to be implemented
}

const deleteProduct = async (id) => {
  //TODO: needs to be implemented
}

export {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};
