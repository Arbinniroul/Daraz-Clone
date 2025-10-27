import express from "express";
import {
    updateProfile,
    becomeSeller,
    addAddress,
    getAddresses,
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.put("/profile", auth, updateProfile);
router.post("/become-seller", auth, becomeSeller);
router.post("/add/address", auth, addAddress);
router.get("/get/address/:id", auth, getAddresses);

export default router;
