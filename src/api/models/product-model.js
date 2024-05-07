import promisePool from "../../utils/database.js";

const getAllProducts = async () => {
  const [rows] = await promisePool.query(`
    SELECT products.*,
           GROUP_CONCAT(allergens.name) as allergen_names,
           GROUP_CONCAT(allergens.id) as allergen_ids
    FROM products
    LEFT JOIN product_allergens ON products.id = product_allergens.product_id
    LEFT JOIN allergens ON product_allergens.allergen_id = allergens.id
    GROUP BY products.id
  `);

  const products = rows.map(product => {
    const allergens = product.allergen_names ? product.allergen_names.split(',').map((name, index) => ({
      id: product.allergen_ids.split(',')[index],
      name
    })) : [];

    const { allergen_names, allergen_ids, ...productWithoutAllergenFields } = product;

    return {
      ...productWithoutAllergenFields,
      allergens
    };
  });

  console.log(products);
  return products;
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
  if (user.role !== 'admin'){
    return false;
  }

  const sql = promisePool.format("UPDATE products SET ? WHERE id = ?", [product, id]);

  const [rows] = await promisePool.query(sql);
  console.log(rows);
  if (rows.affectedRows === 0){
    return false;
  }
  return {message: "Product updated", product};

}

const deleteProduct = async (id, user) => {

  if (user.role !== 'admin'){
    return false;
  }

  const sql = promisePool.format("DELETE FROM products WHERE id = ?", [id]);

  const [rows] = await promisePool.query(sql);
  console.log(rows);
  if (rows.affectedRows === 0){
    return false;
  }
  return {message: "Product deleted", product_id: id};
}

export {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};
