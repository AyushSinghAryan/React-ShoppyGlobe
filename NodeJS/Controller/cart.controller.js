import cartModel from "../Model/cart.model.js";
import productModel from "../Model/products.model.js";
import mongoose from "mongoose";


export const addToCart = async (req, res) => {
    try {

        // Check if user is authenticated
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        const { productId, quantity } = req.body;

        // Validate input
        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        // Validate productId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID format" });
        }

        const userId = req.user.userId;
        const userObjectId = new mongoose.Types.ObjectId(userId);


        // Check if product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find or create cart
        let cart = await cartModel.findOne({ userId: userObjectId });
        if (!cart) {
            cart = new cartModel({ userId: userObjectId, products: [] });
        }

        // Check if product already exists in cart
        const itemIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
        if (itemIndex > -1) {
            // Update quantity if product exists
            cart.products[itemIndex].quantity += quantity;
        } else {
            // Add new product to cart
            cart.products.push({ productId, quantity });
        }

        // Save cart
        await cart.save();

        res.status(200).json({ message: "Product added to cart", cart });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.userId; // Extract user ID from JWT
        const { productId } = req.body; // Extract product ID from request params


        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Find the user's cart
        let cart = await cartModel.findOne({ userId: userObjectId });


        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find product in cart
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Remove the product from cart
        cart.products.splice(productIndex, 1);

        await cart.save();

        res.status(200).json({ message: "Product removed from cart", cart });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



export const updateCartQuantity = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        const { productId, action } = req.body;
        // Validate input
        if (!productId || !action) {
            return res.status(400).json({ message: "Product ID and action are required" });
        }
        // Validate productId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID format" });
        }

        const userId = req.user.userId;
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Find the user's cart
        let cart = await cartModel.findOne({ userId: userObjectId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find product in the cart
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Update quantity based on action
        if (action === "increase") {
            cart.products[productIndex].quantity += 1;
        } else if (action === "decrease") {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity -= 1;
            } else {
                // Optionally, you could remove the product here if quantity is 1.
                return res.status(400).json({ message: "Minimum quantity reached" });
            }
        } else {
            return res.status(400).json({ message: "Invalid action. Use 'increase' or 'decrease'" });
        }

        // Save the updated cart
        await cart.save();
        return res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



export const getCart = async (req, res) => {
    try {
        // Check if the user is authenticated via middleware
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        const userId = req.user.userId;
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Find the cart for the current user and populate product details
        let cart = await cartModel.findOne({ userId: userObjectId }).populate("products.productId");

        // If no cart exists, return an empty cart response
        if (!cart) {
            return res.status(200).json({ message: "Cart is empty", cart: { products: [] } });
        }

        return res.status(200).json({ cart });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
