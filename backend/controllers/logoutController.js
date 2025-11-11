// controllers/logoutController.js
import Session from "../models/Session.js";
import jwt from "jsonwebtoken";

export const logoutUser = async (req, res) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    // Decode token to get email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Mark session as revoked
    const session = await Session.findOneAndUpdate(
      { email, revoked: false },
      { $set: { revoked: true } },
      { sort: { loginTime: -1 }, new: true }
    );

    if (!session)
      return res.status(404).json({ message: "No active session found" });

    res.status(200).json({
      message: `✅ Logout successful for ${email}`,
      session
    });
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};