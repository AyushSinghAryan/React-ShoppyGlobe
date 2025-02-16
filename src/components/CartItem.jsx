import { removeFromCart, increaseQuantity, decreaseQuantity } from '../utils/cartSlice';
import { Bounce, toast } from "react-toastify";

import { useDispatch } from 'react-redux';
// cart we get using props , here we show item price also add item quantity feature , increase and decrease 
function CartItem({ cart }) {
    const dispatch = useDispatch();

    return (
        <>
            {
                cart.map(item => (
                    <div key={item.id} className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 gap-y-4">
                        <div className="col-span-12 lg:col-span-2">
                            <img src={item.thumbnail} alt={item.title} className="w-full lg:w-[180px] rounded-lg object-cover" />
                        </div>
                        <div className="col-span-12 lg:col-span-10 pl-3">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="font-bold text-2xl text-gray-900">{item.title}</h5>
                                <button onClick={() => {

                                    dispatch(removeFromCart(item.id))
                                    toast.warning(`${item.title} removed from cart!`, {
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
                                }} className="rounded-full bg-red-500 text-white p-2 hover:bg-red-700">Remove</button>
                            </div>
                            <p className="text-gray-500 mb-6">{item.description}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => dispatch(decreaseQuantity(item.id))} className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300">-</button>
                                    <span className="font-semibold text-lg">{item.quantity}</span>
                                    <button onClick={() => dispatch(increaseQuantity(item.id))} className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300">+</button>
                                </div>
                                <h6 className="text-indigo-600 font-bold text-2xl">${(item.price * item.quantity).toFixed(2)}</h6>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default CartItem