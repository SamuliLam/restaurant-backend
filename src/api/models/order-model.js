import promisePool from "../../utils/database.js";

const listAllOrders = async () => {
  const [rows] = await promisePool.query("SELECT orders.*, users.first_name, users.last_name, users.phone, users.email FROM orders JOIN users ON orders.customer_id = users.id");
  return rows;
}

const findOrderById = async (id) => {
  const [rows] = await promisePool.query("SELECT * FROM orders WHERE order_id = ?", [id]);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
}

const findOrdersByCustomerId = async (id) => {
  const [orderRows] = await promisePool.query("SELECT * FROM orders WHERE customer_id = ?", [id]);
  if (orderRows.length === 0) {
    return false;
  }

  const orders = [];
  for (let order of orderRows) {
    const [productRows] = await promisePool.query("SELECT * FROM order_items WHERE order_id = ?", [order.order_id]);
    orders.push({
      order: order,
      products: productRows
    });
  }

  return orders;
};

const addOrder = async (order, products) => {
  const {customer_id, delivery_address, status, total_price} = order;
  const sqlOrder = "INSERT INTO orders (customer_id, order_date, delivery_address, status, total_price) VALUES (?, CURRENT_TIMESTAMP, ?, ?, ?)";
  const dataOrder = [customer_id, delivery_address, status, total_price];

  const conn = await promisePool.getConnection();
  try {
    await conn.beginTransaction();

    const [resultOrder] = await conn.query(sqlOrder, dataOrder);
    const orderId = resultOrder.insertId;

    for (let product of products) {
      const sqlItem = "INSERT INTO order_items (order_id, product_id) VALUES (?, ?)";
      const dataItem = [orderId, product.product_id];
      await conn.query(sqlItem, dataItem);
    }

    await conn.commit();
    return {"message": "Order created", "order": order, "products": products};
  } catch (e) {
    await conn.rollback();
    console.error("error", e.message);
    return false;
  } finally {
    conn.release();
  }
}

const updateOrder = async (id, order) => {
  const queryParams = [];

  let setClause = '';

  for (const [key, value] of Object.entries(order)) {
    setClause += `${key} = ?, `;
    queryParams.push(value);
  }

  setClause = setClause.slice(0, -2);

  queryParams.push(id);

  const sql = `UPDATE orders SET ${setClause} WHERE order_id = ?`;

  try {
    const rows = await promisePool.execute(sql, queryParams);
    return !(rows[0].affectedRows === 0);
  } catch (e) {
    console.error("error", e.message);
    return false;
  }
}

const removeOrder = async (id) => {
  const conn = await promisePool.getConnection();
  try {
    await conn.beginTransaction();
    const sql = conn.format("DELETE FROM orders WHERE order_id = ?", [id]);
    const [result] = await conn.execute(sql);

    if (result.affectedRows === 0) {
      return false;
    }
    await conn.commit();
    return {
      message: "Order deleted",
      id: id
    };
  } catch (e) {
    await conn.rollback();
    console.error("error", e.message);
    return false;
  } finally {
    conn.release();
  }
};

const findOrderedItemsByOrderId = async (id) => {
  const [rows] = await promisePool.query("SELECT order_items.*, products.name FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_id = ?", [id]);
  return rows;
};

export {
  listAllOrders,
  findOrderById,
  findOrdersByCustomerId,
  addOrder,
  updateOrder,
  removeOrder,
  findOrderedItemsByOrderId
}
