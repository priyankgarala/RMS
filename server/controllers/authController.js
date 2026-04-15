import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/index.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (name, email, password_hashed)
       VALUES ($1, $2, $3)
       RETURNING id, email`,
      [name, email, hashedPassword]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(
      password,
      user.rows[0].password_hashed   // 👈 IMPORTANT CHANGE
    );

    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
  { id: user.rows[0].id },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN }
);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};