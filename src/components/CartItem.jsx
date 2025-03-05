import { removeFromCart, increaseQuantity, decreaseQuantity } from '../utils/cartSlice';
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function CartItem({ cart }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    const handleRemove = async (id, name) => {
        try {
            await axios.delete("http://localhost:3000/api/cart", {
                data: { productId: id },
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(removeFromCart(id));
            toast.warning(`${name} removed from cart!`, {
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
            console.error("Error removing product:", error);
            toast.error("Failed to remove product from cart.", { transition: Bounce });
        }
    };

    const handleIncrease = async (id, name) => {
        try {
            await axios.put(
                "http://localhost:3000/api/cart",
                { productId: id, action: "increase" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            dispatch(increaseQuantity(id));
            toast.success(`${name} quantity increased!`, {
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
            console.error("Error increasing quantity:", error);
            toast.error("Failed to increase product quantity.", { transition: Bounce });
        }
    };

    const handleDecrease = async (id, name) => {
        try {
            await axios.put(
                "http://localhost:3000/api/cart",
                { productId: id, action: "decrease" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            dispatch(decreaseQuantity(id));
            toast.success(`${name} quantity decreased!`, {
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
            console.error("Error decreasing quantity:", error);
            toast.error("Failed to decrease product quantity.", { transition: Bounce });
        }
    };

    return (
        <>
            {cart.map(item => (
                <div key={item.productId._id} className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 gap-y-4">
                    <div className="col-span-12 lg:col-span-2">
                        <img
                            src={item.productId.image}
                            alt={item.productId.name}
                            className="w-full lg:w-[180px] rounded-lg object-cover"
                        />
                    </div>
                    <div className="col-span-12 lg:col-span-10 pl-3">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="font-bold text-2xl text-gray-900">
                                {item.productId.name}
                            </h5>
                            <button
                                onClick={() => handleRemove(item.productId._id, item.productId.name)}
                                className="rounded-full bg-red-500 text-white p-2 hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </div>
                        <p className="text-gray-500 mb-6">{item.productId.description}</p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleDecrease(item.productId._id, item.productId.name)}
                                    className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <span className="font-semibold text-lg">{item.quantity}</span>
                                <button
                                    onClick={() => handleIncrease(item.productId._id, item.productId.name)}
                                    className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                            <h6 className="text-indigo-600 font-bold text-2xl">
                                ${(item.productId.price * item.quantity).toFixed(2)}
                            </h6>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default CartItem;
