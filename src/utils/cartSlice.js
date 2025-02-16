import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        // addToCart use for adding item in the cart , if item exist in the cart then increase quantity by 1 else add item with quantity 1 
        addToCart: (state, action) => {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        // removeFromCart remove the item based on id match
        removeFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        // increaseQuantity will increase item quantity by 1 , if item exist 
        increaseQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        // decreaseQuantity will decrease item quantity by 1 , if item exist

        decreaseQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        }
    }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
