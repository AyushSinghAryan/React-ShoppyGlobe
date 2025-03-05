import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            // Find item by checking the nested productId._id
            const existingItem = state.find(item => item.productId._id === action.payload.productId._id);
            if (existingItem) {
                // Increase quantity by provided quantity or by 1 if not provided
                existingItem.quantity += action.payload.quantity || 1;
            } else {
                state.push(action.payload);
            }
        },
        removeFromCart: (state, action) =>
            state.filter(item => item.productId._id !== action.payload),
        increaseQuantity: (state, action) => {
            const item = state.find(item => item.productId._id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const item = state.find(item => item.productId._id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },
        setCart: (state, action) => action.payload, // to set the entire cart from backend
        clearCart: () => []  // New action to clear the cart

    }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
