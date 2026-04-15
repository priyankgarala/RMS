import dotenv from "dotenv";
dotenv.config(); // ✅ ADD THIS

import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: Number(process.env.DB_PORT),
});


console.log("POOL CREATED WITH USER:", process.env.DB_USER);
// test
pool.query("SELECT 1")
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.error("❌ DB error:", err.message));