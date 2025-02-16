import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { Bounce, toast } from "react-toastify";

function ProductItem({ filteredProduct }) {
    const dispatch = useDispatch();
    // we use using dispatch because onces user click on add to cart button item added to the user  cart 
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProduct.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                >
                    <Link to={`/productDetail/${product.id}`} state={product}>
                        <div className="relative">
                            <img
                                className="w-full h-48 object-cover"
                                src={product.images[0]}
                                alt={product.title}
                            />
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                                SALE
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-medium mb-2">{product.title}</h3>
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
                            onClick={(e) => {
                                e.preventDefault();  // Prevent navigation
                                e.stopPropagation(); // Ensure only button click is handled
                                dispatch(addToCart(product));
                                // after product added to cart it will notify to user product added to the cart
                                toast.success(`${product.title} added to cart!`, {
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
