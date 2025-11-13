import jwt from "jsonwebtoken";
import User from "../models/User.js";

// VERIFY LOGIN TOKEN
export const verifyToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided." });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// CHECK ADMIN ROLE
export const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.user.email });
      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.role !== role)
        return res.status(403).json({ message: "Permission denied" });

      next();
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
};

// VERIFY OTP ACCESS TOKEN
export const verifyOtpAccess = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "OTP token missing" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.otpVerified)
      return res.status(403).json({ message: "OTP verification required" });

    req.otp = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired OTP token" });
  }
};