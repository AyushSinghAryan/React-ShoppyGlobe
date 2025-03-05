import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart } from "../utils/cartSlice";
import { Bounce, toast } from "react-toastify";

function ProductItem({ filteredProduct }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    console.log("token is ")
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProduct.map((product) => (
                <div
                    key={product._id}
                    className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                >
                    <Link to={`/productDetail/${product._id}`} state={product}>
                        <div className="relative">
                            <img
                                className="w-full h-48 object-contain"
                                src={product.image}
                                alt={product.name}
                            />
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                                SALE
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {product.description.length > 60
                                    ? `${product.description.substring(0, 60)}...`
                                    : product.description}
                            </p>
                            <span className="font-bold text-lg text-gray-900">${product.price}</span>
                        </div>
                    </Link>
                    <div className="p-4">
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
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductItem;
