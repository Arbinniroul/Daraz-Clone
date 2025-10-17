import express from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
} from "../controllers/cartController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getCart);
router.post("/items", auth, addToCart);
router.put("/items/:id", auth, updateCartItem);
router.delete("/items/:id", auth, removeFromCart);

export default router;
