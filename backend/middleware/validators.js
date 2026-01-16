import { body, param, validationResult } from "express-validator";

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Login validation rules
export const validateLogin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  handleValidationErrors
];

// OTP send validation
export const validateSendOtp = [
  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .matches(/^\+[1-9]\d{6,14}$/)
    .withMessage("Mobile must be in international format (e.g., +919876543210)"),
  handleValidationErrors
];

// OTP verify validation
export const validateVerifyOtp = [
  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .matches(/^\+[1-9]\d{6,14}$/)
    .withMessage("Mobile must be in international format"),
  body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must contain only numbers"),
  handleValidationErrors
];

// Email param validation (for user-sessions route)
export const validateEmailParam = [
  param("email")
    .trim()
    .isEmail()
    .withMessage("Valid email parameter is required")
    .normalizeEmail(),
  handleValidationErrors
];

// Logout session validation
export const validateLogoutSession = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  handleValidationErrors
];
