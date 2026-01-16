import rateLimit from "express-rate-limit";

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    message: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for login attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    message: "Too many login attempts, please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for OTP requests
export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes  
  max: 3, // Limit each IP to 3 OTP requests per windowMs
  message: {
    message: "Too many OTP requests, please try again after 5 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Very strict limiter for OTP verification (prevent brute force)
export const otpVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 verify attempts per windowMs
  message: {
    message: "Too many OTP verification attempts, please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});
