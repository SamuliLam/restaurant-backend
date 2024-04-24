import promisePool from "../../utils/database.js";

const listAllUsers = async () => {
  const [rows] = await promisePool.query("SELECT * FROM users");
  return rows;
}

const findUserById = async (id) => {
  const [rows] = await promisePool.query("SELECT * FROM users WHERE id = ?", [id]);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
}

const getUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [rows] = await promisePool.query(sql, [email]);
  if (rows.length === 0) {
    return false;
  }
  console.log(rows)
  return rows[0];
}

const addUser = async (user) => {
  const {first_name, last_name, email, phone, address, password, role} = user;
  const sql = "INSERT INTO users (first_name, last_name, email, phone, address, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const data = [first_name, last_name, email, phone, address, password, role];
  const rows = await promisePool.query(sql, data);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {user: user, id: rows[0].insertId}
}

const updateUser = async (id, user) => {
  const sql = promisePool.format("UPDATE users SET ? WHERE id = ?", [user, id]);
  try {
     const rows = await promisePool.execute(sql);
      if (rows[0].affectedRows === 0) {
        return false;
      }
      return true;
  } catch (e) {
    console.error("error", e.message);
    return false;
  }
}

const removeUser = async (id) => {
  const conn = await promisePool.getConnection();
  try {
    await conn.beginTransaction();
    const sql = conn.format("DELETE FROM users WHERE id = ?", [id]);
    const [result] = await conn.execute(sql);

    if (result.affectedRows === 0) {
      return false;
    }

    await conn.commit();
    return {
      message: "User deleted",
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

export {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  removeUser,
  getUserByEmail
}
