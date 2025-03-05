import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../Model/user.model.js";

export const register = async (req, res) => {
    try {
        // Take name, email, and password from the user
        const { name, email, password } = req.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new userModel({ name, email, password: hashedPassword });

        // Save the new user in the database
        await user.save();

        // Generate JWT token
        const token = await jwt.sign({ userId: user._id }, "secretKey", { expiresIn: '1h' });

        // Send success response with token
        res.status(201).json({
            message: 'User registered successfully',
            token
        });
    } catch (err) {
        // If something went wrong, send an error message
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        // Take email and password from the user input
        const { email, password } = req.body;

        // Find the user by email in the database
        const user = await userModel.findOne({ email });

        // If the user does not exist, return an error
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // If the password does not match, return an error
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });

        // Send the token in the response
        res.json({ token, user });
    } catch (error) {
        // If something went wrong, send an error message
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
}
