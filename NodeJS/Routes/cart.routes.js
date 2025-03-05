import express from "express";

import authMiddleware from "../middleware/auth.js";
import { addToCart, getCart, removeFromCart, updateCartQuantity } from "../Controller/cart.controller.js";

const router = express.Router();

router.get('/', authMiddleware, getCart)
router.post("/", authMiddleware, addToCart);

router.delete('/', authMiddleware, removeFromCart);

router.put("/", authMiddleware, updateCartQuantity)
export default router;