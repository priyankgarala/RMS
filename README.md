import { getNextJob } from "./queue.js";
import { pool } from "../db/index.js";
import { getIO } from "../socket.js";

export const startWorker = (workerId) => {
  console.log(`👨‍🍳 Worker ${workerId} started...`);

  const processQueue = async () => {
    const job = getNextJob();

    if (job) {
      const { orderId } = job;
      const io = getIO();

      console.log(`👨‍🍳 Worker ${workerId} cooking order: ${orderId}`);

      // 🔥 FIX: convert to string
      io.to(String(orderId)).emit("orderUpdate", {
        status: "cooking",
      });

      await new Promise((res) => setTimeout(res, 5000));

      await pool.query(
        "UPDATE orders SET status = 'ready' WHERE id = $1",
        [orderId]
      );

      console.log(`✅ Worker ${workerId} finished order: ${orderId}`);

      // 🔥 FIX: convert to string
      io.to(String(orderId)).emit("orderUpdate", {
        status: "ready",
      });
    }

    setTimeout(processQueue, 1000);
  };

  processQueue();
};
