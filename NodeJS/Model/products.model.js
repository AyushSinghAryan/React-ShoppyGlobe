import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    // name, price, description, and
    // stock quantity
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number,
    },
    image: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String,
    },
    stock: {
        type: Number,
        required: true, // Ensure stock is mandatory
        min: 1
    }

}, { timestamps: true });

const productModel = mongoose.model("Product", productSchema);
export default productModel;