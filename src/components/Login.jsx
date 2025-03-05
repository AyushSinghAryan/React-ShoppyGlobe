import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../utils/authSlice"; // Adjust the path as necessary

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:3000/api/auth/login/", { email, password });
            const token = res.data.token; //  backend return the token in res.data.token
            const user = res.data.user;
            // Dispatch the login action from your authSlice
            dispatch(login(token, user));

            navigate("/"); // Redirect after login
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-96 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
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
                        Login
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Don't have an account? <a href="/signup" className="text-pink-400">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
