import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify Token Middleware
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Access denied. No token provided." });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

//  Role Check Middleware
export const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.user.email });
      if (!user) return res.status(404).json({ message: "User not found" });
      if (user.role !== role)
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });

      next();
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
};