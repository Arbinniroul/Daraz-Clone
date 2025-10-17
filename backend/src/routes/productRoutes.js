import express from "express";
import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
} from "../controllers/productController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", auth, updateProduct);

export default router;
