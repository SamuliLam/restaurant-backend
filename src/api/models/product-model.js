import promisePool from "../../utils/database.js";

const getAllProducts = async () => {
  const [rows] = await promisePool.query("SELECT * FROM products");
  console.log(rows);
  return rows;
}

const getProductById = async (id) => {
  const [rows] = await promisePool.query("SELECT * FROM products WHERE id = ?", [id]);
  console.log(rows);
  return rows[0];
}

const createProduct = async (product, user) => {
  if (user.role !== 'admin'){
    return false;
  }

  const {name, description, price, category} = product;
  const sql = "INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)";
  const params = [name, description, price, category];
  const rows = await promisePool.query(sql, params);
  console.log(rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {product_id: rows[0].insertId};
}

const updateProduct = async (product, id, user) => {
  let sql = promisePool.format("UPDATE products SET ? WHERE product_id = ? AND user_id = ?", [product, id, user.id]);

  if (user.role === 'admin'){
    sql = promisePool.format("UPDATE products SET ? WHERE product_id = ?", [product, id]);
  }

  const [rows] = await promisePool.query(sql);
  console.log(rows);
  if (rows.affectedRows === 0){
    return false;
  }
  return {message: "Product updated", product};

}

const deleteProduct = async (id, user) => {
  let sql = promisePool.format("DELETE FROM products WHERE product_id = ? AND user_id = ?", [id, user.id]);

  if (user.role === 'admin'){
    sql = promisePool.format("DELETE FROM products WHERE product_id = ?", [id]);
  }

  const [rows] = await promisePool.query(sql);
  console.log(rows);
  if (rows.affectedRows === 0){
    return false;
  }
  return {message: "Product deleted", product_id: id};
}

export {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};
