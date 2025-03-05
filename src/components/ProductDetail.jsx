import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../utils/cartSlice";
import { Star } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import axios from "axios";

const ProductDetail = () => {
    const location = useLocation();
    const product = location.state;
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    // if  product is not found then we return this div
    if (!product) {
        return <div className="text-center text-red-500 text-xl">Product not found</div>;
    }

    return (
        <div className="bg-gray-100 flex flex-col sm:flex-row relative z-20 items-center overflow-hidden min-h-screen">
            <div className="container mx-auto px-6 flex flex-col sm:flex-row relative py-16 h-full">
                <div className="sm:w-2/3 lg:w-2/5 flex justify-center flex-col relative z-20">
                    <h1 className="font-bebas-neue uppercase text-6xl sm:text-5xl font-black flex flex-col leading-none text-black">
                        {product.name}
                        <span className="text-5xl sm:text-3xl py-4">${product.price}</span>
                    </h1>
                    <p className="text-sm sm:text-base text-black">{product.description}</p>
                    <div className="mt-4">
                        <span className="text-lg font-semibold text-black">Brand:</span> <span className="text-black">{product.brand}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="text-lg font-semibold text-black">Rating:</span>
                        <span className="flex items-center ml-2 text-yellow-400">
                            {/* this will so the star based on rating  */}
                            {Array.from({ length: Math.round(product.rating) }).map((_, index) => (
                                <Star key={index} size={18} fill="currentColor" className="mr-1" />
                            ))}
                        </span>
                        <span className="ml-2 text-black">({product.rating})</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-lg font-semibold text-black">Category:</span> <span className="text-black">{product.category}</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-lg font-semibold text-black">Return Policy:</span> <span className="text-black">{product.returnPolicy}</span>
                    </div>
                    <div className="flex mt-8">
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log("product is ", product);
                                if (!token) {
                                    toast.error("Please log in to add items to cart!", {
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
                                    return;
                                }
                                try {
                                    await axios.post(
                                        "http://localhost:3000/api/cart",
                                        { productId: product._id, quantity: 1 },
                                        { headers: { Authorization: `Bearer ${token}` } }
                                    );
                                    dispatch(addToCart({ productId: product, quantity: 1 }));
                                    toast.success(`${product.name} added to cart!`, {
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
                                } catch (error) {
                                    console.error("Error adding product to cart:", error);
                                    toast.error("Failed to add product to cart.", {
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
                                }
                            }}
                            className="uppercase py-2 px-6 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400 transition-all duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className="w-full sm:w-1/3 lg:w-3/5 flex justify-center items-center mt-6 sm:mt-0">
                    <img src={product.image} alt={product.name} className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
