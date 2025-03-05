import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import shopLogo from "../assets/shopLogo.svg";
import { logout } from "../utils/authSlice.js";
import { setCart, clearCart } from "../utils/cartSlice"; // Import clearCart

function Header() {
    const cart = useSelector((state) => state.cart);
    const { token, user } = useSelector((state) => state.auth);
    const isAuthenticated = Boolean(token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    console.log(user);
    // Optionally hide cart link on login/signup pages
    const hideCartLink = location.pathname === "/login" || location.pathname === "/signup";

    useEffect(() => {
        if (token) {
            const fetchCart = async () => {
                try {
                    const response = await axios.get("http://localhost:3000/api/cart", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.data.cart && response.data.cart.products) {
                        dispatch(setCart(response.data.cart.products));
                    }
                } catch (error) {
                    console.error("Error fetching cart:", error);
                }
            };
            fetchCart();
        }
    }, [token, dispatch]);

    const handleLogout = () => {
        fetch("http://localhost:3000/api/auth/logout", { method: "POST" })
            .then(() => {
                dispatch(logout());
                dispatch(clearCart());  // Clear cart state on logout
                setShowDropdown(false);
                navigate("/login");
            })
            .catch((err) => console.error("Logout Error:", err));
    };

    return (
        <header className="relative z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
            {/* Left Side: Logo & Home Link */}
            <div className="flex items-center space-x-6">
                <Link to="/">
                    <img src={shopLogo} className="h-10" alt="Shop Logo" />
                </Link>
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-bold text-lg">
                    Home
                </Link>
            </div>

            {/* Right Side: Cart Icon and Auth Controls */}
            <div className="flex items-center space-x-4">
                {!hideCartLink && (
                    <Link to="/cart">
                        <div className="relative">
                            <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                                <svg
                                    className="w-7 h-7 text-gray-800"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l1.5 10.5a2 2 0 002 1.5h9.5a2 2 0 002-1.5L21 6H5M16 19a2 2 0 11-4 0 2 2 0 014 0zm-6 0a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </Link>
                )}
                {isAuthenticated ? (
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                        >
                            {user && user.username ? user.username : "Profile"}
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        Login / Signup
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
