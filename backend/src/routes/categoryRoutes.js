import express from "express";
import {
    getCategories,
    createCategory,
} from "../controllers/categoryController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", auth, createCategory); // Admin only in real app

export default router;
