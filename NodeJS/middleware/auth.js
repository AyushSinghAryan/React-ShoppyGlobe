import jwt from 'jsonwebtoken';


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    console.log(" Headers Received", req.headers); // Debug headers

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        // Ensure token starts with "Bearer "
        const tokenWithoutBearer = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

        console.log("Extracted Token", tokenWithoutBearer);

        // Verify token using the correct secret

        const verified = jwt.verify(tokenWithoutBearer, "secretKey");
        req.user = { userId: verified.userId }; // Ensure userId is attached

        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

export default authMiddleware;
