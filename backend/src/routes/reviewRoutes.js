import express from "express";
import {
    createReview,
    getProductReviews,
} from "../controllers/reviewController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createReview);
router.get("/product/:productId", getProductReviews);

export default router;
