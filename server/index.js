import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import "./queue/worker.js";

const app = express();

app.use(cors());
app.use(express.json());

// debug env
console.log("ENV DEBUG:", {
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});