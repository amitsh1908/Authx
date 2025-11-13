import React, { useState } from "react";
import { api } from "../utils/api";

function OtpModal({ visible, onClose, onVerify }) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const adminEmail = localStorage.getItem("adminEmail");
  const token = localStorage.getItem("token");

  const sendOtp = async () => {
    if (!mobile) {
      alert("Please enter mobile number");
      return;
    }
    try {
      setLoading(true);

      const res = await api.post(
        "/admin/send-otp",
        { mobile },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("OTP Sent! (Check console)");
      console.log("OTP:", res.data.otp);

      setStep(2);
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const res = await api.post(
        "/admin/verify-otp",
        { mobile, otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.setItem("otpToken", res.data.otpToken);

      alert("OTP Verified!");
      onVerify();
      onClose();
    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>OTP Verification</h3>

        {step === 1 && (
          <>
            <p>Enter Mobile Number</p>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <button onClick={sendOtp} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p>Enter OTP</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        <button onClick={onClose} style={{ marginTop: "10px" }}>Close</button>
      </div>
    </div>
  );
}

export default OtpModal;