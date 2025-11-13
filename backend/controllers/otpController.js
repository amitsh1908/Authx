import Otp from "../models/Otp.js";
import jwt from "jsonwebtoken";

// SEND OTP (Admin Authorization)
export const sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile)
      return res.status(400).json({ message: "Mobile number is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({ mobile, otp });

    console.log("📲 OTP for", mobile, ": ", otp);

    return res.status(200).json({
      message: "OTP sent successfully",
      otp // dev mode only
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp)
      return res.status(400).json({ message: "Mobile & OTP are required" });

    const record = await Otp.findOne({ mobile, otp });
    if (!record)
      return res.status(400).json({ message: "Invalid OTP" });

    // Create OTP ACCESS TOKEN (THIS FIXES EVERYTHING)
    const otpToken = jwt.sign(
      {
        mobile,
        otpVerified: true,
        email: req.user.email,   // ⭐ IMPORTANT
        role: req.user.role      // ⭐ IMPORTANT
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    await Otp.deleteMany({ mobile });

    return res.status(200).json({
      message: "OTP verified successfully",
      otpToken
    });

  } catch (err) {
    res.status(401).json({ message: "Error verifying OTP", error: err.message });
  }
};