import jwt from 'jsonwebtoken';
import { envVars } from '../Config/envVars.js';
import { User } from '../models/userModel.js';

export const ProtectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - token not provided" });
        }

        const decoded = jwt.verify(token, envVars.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - token verification failed" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
