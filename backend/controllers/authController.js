import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import requestIp from "request-ip";
import { UAParser } from "ua-parser-js";
import fetch from "node-fetch";

import User from "../models/User.js";
import Session from "../models/Session.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Extract IP, device, location
    const ip = requestIp.getClientIp(req) || req.ip;
    const parser = new UAParser(req.headers["user-agent"]);
    const device = `${parser.getOS().name || "Unknown"} ${
      parser.getBrowser().name || ""
    }`.trim();

    let location = "Unknown";
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      location = `${data.city || "Unknown"}, ${data.country_name || ""}`;
    } catch {
      location = "Not Found";
    }

    // Save login session 
    const session = new Session({ email, ip, device, location });
    await session.save();

    // JWT token
    const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //  Response
    res.status(200).json({
      message: `Login successful for ${email}`,
      token,
      user: { name: user.name, email: user.email, role: user.role },
      session: { device, location, ip },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
