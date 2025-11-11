import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  device: { type: String },
  ip: { type: String },
  location: { type: String },
  loginTime: { type: Date, default: Date.now },
  revoked: { type: Boolean, default: false }
});

export default mongoose.model("Session", sessionSchema);