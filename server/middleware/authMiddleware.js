import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ check token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ extract token
    const token = authHeader.split(" ")[1];

    // ✅ check JWT secret exists
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret not configured" });
    }

    // ✅ verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ attach user
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth Error:", err.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};