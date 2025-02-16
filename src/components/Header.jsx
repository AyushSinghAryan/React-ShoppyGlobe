import shopLogo from "../assets/shopLogo.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header() {
    const cart = useSelector(state => state.cart);

    return (
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <Link to="/">  <img src={shopLogo} className="h-10" /></Link>
            </div>

            {/* Home Link */}
            <nav>

                <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-bold text-3xl"> Home</Link>


            </nav>

            {/* Cart Icon */}
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
                        {/* Cart Counter using cart length it show number of product in cart  */}
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {cart.length}
                        </span>
                    </button>
                </div>
            </Link>
        </header>
    );
}
export default Header;