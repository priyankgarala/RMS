import { pool } from "./index.js";

// USERS
export const findUserByEmail = (email) => {
  return pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

export const createUser = (name, email, password_hashed) => {
  return pool.query(
    `INSERT INTO users (name, email, password_hashed)
     VALUES ($1, $2, $3)
     RETURNING id, email`,
    [name, email, password_hashed]
  );
};

// ORDERS
export const createOrder = (userId) => {
  return pool.query(
    "INSERT INTO orders (user_id) VALUES ($1) RETURNING *",
    [userId]
  );
};

export const createOrderItem = (orderId, name, quantity) => {
  return pool.query(
    "INSERT INTO order_items (order_id, item_name, quantity) VALUES ($1,$2,$3)",
    [orderId, name, quantity]
  );
};

export const getOrderById = (id) => {
  return pool.query("SELECT * FROM orders WHERE id = $1", [id]);
};