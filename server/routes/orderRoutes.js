import express from "express";
import { createOrder, getOrderStatus } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/:id", authMiddleware, getOrderStatus);

export default router;