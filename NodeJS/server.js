import express from "express";
import mongoose from "mongoose";

import productRoutes from "./Routes/product.routes.js";

import cartRoutes from "./Routes/cart.routes.js";

import authRoutes from "./Routes/auth.routes.js"
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 3000;



mongoose.connect("mongodb://localhost:27017/");

const db = mongoose.connection;

db.on("open", () => {
    console.log("Database connection is successful")
})

db.on("error", () => {
    console.log("Connection is not successful")
})

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})