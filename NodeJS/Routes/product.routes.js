import express from "express";
import { createProduct, fetchProducts, fetchProductById } from "../Controller/product.controller.js";

const router = express.Router();
router.post("/product", createProduct);
router.get("/", fetchProducts);
router.get("/:id", fetchProductById);

export default router;
