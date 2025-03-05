import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CartItem from './CartItem';
import { setCart } from '../utils/cartSlice';
import { Bounce, toast } from "react-toastify";

function Cart() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const cart = useSelector(state => state.cart);

    // Fetch the cart from the backend when the component mounts (if logged in)
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/cart", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Assuming your backend returns the cart as: { cart: { products: [...] } }
                if (response.data.cart && response.data.cart.products) {
                    dispatch(setCart(response.data.cart.products));
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
                toast.error("Failed to fetch cart from server");
            }
        };

        if (token) {
            fetchCart();
        }
    }, [token, dispatch]);

    // Calculate total price using useMemo for performance
    const totalPrice = useMemo(() =>
        cart.reduce((total, item) => total + item.productId.price * item.quantity, 0),
        [cart]
    );

    // If cart is empty, show a message and button to browse products
    if (cart.length === 0) {
        return (
            <div className="p-6 bg-gradient-to-r from-gray-200 to-blue-100 min-h-screen flex flex-col md:flex-row items-center justify-center gap-4">
                <p className="text-xl font-semibold text-gray-600 text-center">
                    Your cart is empty! Add some products to get started.
                </p>
                <Link to="/">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        Browse Products
                    </button>
                </Link>
            </div>
        );
    }


    return (
        <section className="py-10 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <h2 className="font-bold text-4xl text-center text-black mb-8">Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    <CartItem cart={cart} />
                )}
                <div className="flex flex-col md:flex-row items-center justify-between pb-6 border-b border-gray-200">
                    <h5 className="text-gray-900 font-semibold text-2xl">Subtotal</h5>
                    <h6 className="font-bold text-3xl text-indigo-600">${totalPrice.toFixed(2)}</h6>
                </div>
                <button onClick={() => {
                    toast.info(`Coming soon... :)`, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }} className="mt-6 w-full py-4 bg-indigo-600 text-white font-semibold text-lg rounded-full hover:bg-indigo-700">
                    Checkout
                </button>
            </div>
        </section>
    );
}

export default Cart;
