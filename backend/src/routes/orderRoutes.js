import express from "express";
import {
    createOrder,
    getOrders,
    getOrder,
} from "../controllers/orderController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getOrders);
router.get("/:id", auth, getOrder);

export default router;
