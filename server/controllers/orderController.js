import { pool } from "../db/index.js";
import { addToQueue } from "../queue/queue.js";
// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    // create order
    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, status) VALUES ($1, 'pending') RETURNING *",
      [userId]
    );

    const order = orderResult.rows[0];

    // insert items
    for (let item of items) {
      await pool.query(
        "INSERT INTO order_items (order_id, item_name, quantity) VALUES ($1,$2,$3)",
        [order.id, item.name, item.quantity]
      );
    }

    // 🔥 send to queue
    addToQueue({
  orderId: order.id,
});

console.log("📦 Order queued:", order.id);

    res.json({
      message: "Order placed successfully",
      orderId: order.id,
      status: "pending",
    });
  } catch (err) {
    console.error("Order Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// GET ORDER STATUS
export const getOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM orders WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Status Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};