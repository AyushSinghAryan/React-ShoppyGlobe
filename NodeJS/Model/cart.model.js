import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }
    ]

})

const cartModel = mongoose.model('Cart', cartSchema);
export default cartModel;