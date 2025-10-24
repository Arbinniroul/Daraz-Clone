import express from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
} from "../controllers/cartController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/fetch", auth, getCart);
router.post("/add", auth, addToCart);
router.put("/update/:id", auth, updateCartItem);
router.delete("/remove/:id", auth, removeFromCart);

export default router;
