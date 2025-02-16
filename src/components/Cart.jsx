import React from 'react'
import { useSelector, } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import CartItem from './CartItem';
import { Bounce, toast } from "react-toastify";


function Cart() {
    //  we get inital state of cart using useSelector , initally cart is empty 
    const cart = useSelector(state => state.cart);
    // here we are using use memo for total price calculation , for optimazation 
    const totalPrice = useMemo(() =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0),
        [cart]
    );
    // if cart is empty then we  use button to return user homepage 
    if (cart.length === 0) {
        return (
            <div className="p-6 bg-gradient-to-r from-grey-200 to-blue-100 min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-600">
                    Your cart is empty! Add some products to get started.
                </p>
                <Link to="/">   <button
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"

                >
                    Browse Products
                </button></Link>
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
                    // this checkout button we notify user to checkout 
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
                }} className="mt-6 w-full py-4 bg-indigo-600 text-white font-semibold text-lg rounded-full hover:bg-indigo-700">Checkout</button>
            </div>
        </section>
    );
}

export default Cart
