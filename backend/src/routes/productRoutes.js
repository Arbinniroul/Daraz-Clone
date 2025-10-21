import express from "express";
import {
    createProduct,
    getProduct,
    getProducts,
    getSaleProducts,
    updateProduct,
    updateProductSale,
} from "../controllers/productController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Product CRUD routes
router.post("/", auth, createProduct);
router.get("/fetchProducts", getProducts);
router.get("/:id", getProduct);
router.put("/:id", auth, updateProduct);

// Sale-specific routes
router.patch("/:id/sale", auth, updateProductSale); // Update only sale information
router.get("/sale/products", getSaleProducts); // Get all active sale products

export default router;
