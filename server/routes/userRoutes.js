import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.user.id,
  });
});

export default router;