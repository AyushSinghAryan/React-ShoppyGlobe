import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../utils/authSlice"; // Adjust the import path as needed

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:3000/api/auth/register/", { name, email, password });

            if (res.data.token) {
                dispatch(login(res.data.token)); // Store the token in Redux and localStorage
                navigate("/"); // Redirect to the home page after auto login
            } else {
                // Otherwise, redirect to the login page
                navigate("/login");
            }
        } catch (err) {
            setError("Error creating account");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-96 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded transition">
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Already have an account? <a href="/login" className="text-pink-400">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
