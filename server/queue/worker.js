import { getNextJob } from "./queue.js";
import { pool } from "../db/index.js";

console.log("👨‍🍳 Worker started...");

const processQueue = async () => {
  const job = getNextJob();

  if (job) {
    const { orderId } = job;

    console.log("🍳 Cooking order:", orderId);

    // simulate cooking delay
    await new Promise((res) => setTimeout(res, 5000));

    // update DB
    await pool.query(
      "UPDATE orders SET status = 'ready' WHERE id = $1",
      [orderId]
    );

    console.log("✅ Order ready:", orderId);
  }

  // keep running
  setTimeout(processQueue, 1000);
};

// start worker loop
processQueue();